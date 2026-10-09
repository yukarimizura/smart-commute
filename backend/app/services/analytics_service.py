from app.schemas.route_schema import TransportOption, RouteSummary, OptimalTimeRecommendation

class AnalyticsService:
    @staticmethod
    def get_traffic_multiplier(time_str: str, day_type: str):
        """
        Menghitung pengali hambatan lalu lintas Jakarta berdasarkan profil jam & hari.
        """
        hours, minutes = map(int, time_str.split(":"))
        t = hours + minutes / 60.0

        if day_type == "holiday":
            # Hari Libur Nasional: lalu lintas lengang
            return 1.05, "Hari Libur Nasional (Lalu Lintas Sangat Lengang)"
        
        if day_type == "weekend":
            # Akhir pekan (Sabtu-Minggu): Pagi lengang, sore/malam padat di area mall
            if 12.0 <= t <= 20.0:
                return 1.25, "Akhir Pekan (Padat Area Rekreasi & Perbelanjaan)"
            return 1.10, "Akhir Pekan (Lancar / Lengang)"

        # Hari Kerja (Senin - Jumat):
        if 6.25 <= t < 7.25:
            # 06:15 - 07:15
            return 1.40, "Jam Sekolah (School Rush - Simpang & Arteri Padat)"
        elif 7.25 <= t <= 9.25:
            # 07:15 - 09:15
            return 1.65, "Puncak Jam Kantor (Morning Peak - Macet Berat Koridor Arteri & Tol)"
        elif 9.25 < t < 11.5:
            # 09:15 - 11:30
            return 1.15, "Jam Kerja Normal (Relatif Lancar)"
        elif 11.5 <= t <= 13.5:
            # 11:30 - 13:30
            return 1.30, "Jam Istirahat / Kuliner (Padat Lokal)"
        elif 16.5 <= t <= 19.5:
            # 16:30 - 19:30
            return 1.70, "Puncak Pulang Kantor (Evening Peak - Macet Total Arah Keluar Pusat Kota)"
        elif 19.5 < t <= 21.0:
            return 1.25, "Mulai Mengurai (Sedang)"
        else:
            return 1.05, "Malam / Dini Hari (Lancar Bebas Hambatan)"

    @staticmethod
    def evaluate_options(dist_km: float, base_min: float, weather: dict, 
                         selected_mode: str, driver_skill: str, 
                         departure_time: str, day_type: str, target_arrival_time: str,
                         origin_display: str, dest_display: str):

        # 1. Hitung pengali trafik sesuai jam & hari
        traffic_mult, traffic_desc = AnalyticsService.get_traffic_multiplier(departure_time, day_type)
        is_rush = traffic_mult >= 1.40

        # Simpang lampu merah & penalti per lampu
        num_intersections = max(2, int(dist_km / 1.5))
        delay_per_light = 2.2 if is_rush else 1.1

        # Kualitas Udara Ambien
        ambient_pm25 = int(90 * traffic_mult)

        # Persona Skill
        if driver_skill == "pro":
            speed_mult = 1.35
            light_penalty_mult = 0.55
            late_relief = 0.20
            skill_note = "Skill Pro (Paham celah tikus & manuver cepat)"
        elif driver_skill == "beginner":
            speed_mult = 0.85
            light_penalty_mult = 1.25
            late_relief = -0.15
            skill_note = "Skill Pemula (Jaga jarak aman & hindari selap-selip)"
        else:
            speed_mult = 1.0
            light_penalty_mult = 1.0
            late_relief = 0.0
            skill_note = "Skill Normal (Mengalir ikut arus lalu lintas)"

        # ==========================================
        # MODA 1: MOBIL PRIBADI
        # ==========================================
        # Kecepatan dasar mobil Jakarta disesuaikan secara dinamis dengan pengali kemacetan
        car_speed = max(11.0, 26.0 / (traffic_mult ** 0.8)) * speed_mult
        car_drive_min = (dist_km / car_speed) * 60.0
        car_lights = num_intersections * delay_per_light * light_penalty_mult
        car_rain = 1.30 if weather["is_raining"] else 1.0
        parking_time = 8.0 if driver_skill == "pro" else 12.0
        car_dur = (car_drive_min + car_lights) * car_rain + parking_time

        # Hitung peluang telat terhadap target kedatangan
        dep_h, dep_m = map(int, departure_time.split(":"))
        tar_h, tar_m = map(int, target_arrival_time.split(":"))
        available_window = (tar_h * 60 + tar_m) - (dep_h * 60 + dep_m)
        
        if available_window > 0:
            car_buffer = available_window - car_dur
            if car_buffer < 0:
                car_p_late = 0.95
            elif car_buffer < 15:
                car_p_late = 0.65 - late_relief
            else:
                car_p_late = max(0.05, 0.25 - late_relief)
        else:
            car_p_late = 0.99

        car_pm25 = round(ambient_pm25 * 0.20, 1)

        # ==========================================
        # MODA 2: SEPEDA MOTOR
        # ==========================================
        moto_speed = max(18.0, 38.0 / (traffic_mult ** 0.4)) * speed_mult
        moto_drive_min = (dist_km / moto_speed) * 60.0
        moto_lights = num_intersections * 0.4 * light_penalty_mult
        moto_rain = 1.45 if weather["is_raining"] else 1.0
        motor_dur = (moto_drive_min + moto_lights) * moto_rain + 4.0

        if available_window > 0:
            moto_buffer = available_window - motor_dur
            if moto_buffer < 0:
                moto_p_late = 0.90
            elif moto_buffer < 10:
                moto_p_late = 0.45 - late_relief
            else:
                moto_p_late = max(0.05, 0.15 - late_relief)
        else:
            moto_p_late = 0.95

        motor_pm25 = ambient_pm25

        # ==========================================
        # MODA 3: KRL COMMUTER LINE
        # ==========================================
        # Kereta bebas macet jalan raya, hanya terpengaruh headway jam sibuk (tiap 5 mnt vs 10 mnt)
        headway = 5.0 if is_rush else 9.0
        rail_speed = 42.0
        rail_dur = (dist_km / rail_speed) * 60.0
        krl_dur = 13.0 + headway + rail_dur + 11.0
        krl_p_late = 0.12 if not weather["is_raining"] else 0.20
        krl_pm25 = round(ambient_pm25 * 0.45, 1)

        raw_options = [
            TransportOption(
                mode="Sepeda Motor",
                key="motorcycle",
                duration_min=round(motor_dur, 1),
                p_late=round(moto_p_late, 2),
                co2_grams=round(dist_km * 103, 1),
                aqi_risk=f"Tinggi ({motor_pm25} µg/m³ PM2.5)",
                detail=f"Manuver roda dua. {skill_note}.",
                is_selected=(selected_mode == "motorcycle")
            ),
            TransportOption(
                mode="Mobil Pribadi",
                key="car",
                duration_min=round(car_dur, 1),
                p_late=round(car_p_late, 2),
                co2_grams=round(dist_km * 192, 1),
                aqi_risk=f"Sangat Rendah ({car_pm25} µg/m³ - Terfilter AC)",
                detail=f"Kabin berfilter AC. {skill_note}.",
                is_selected=(selected_mode == "car")
            ),
            TransportOption(
                mode="KRL / Angkutan Umum",
                key="krl",
                duration_min=round(krl_dur, 1),
                p_late=krl_p_late,
                co2_grams=round(dist_km * 28, 1),
                aqi_risk=f"Rendah ({krl_pm25} µg/m³ - Gerbong AC)",
                detail="Transit rel KRL Jabodetabek. Kebal dari kemacetan jalan raya.",
                is_selected=(selected_mode == "krl")
            )
        ]

        best_opt = min(raw_options, key=lambda x: (x.p_late * 0.65 + (x.co2_grams / 1000) * 0.35))
        for opt in raw_options:
            opt.recommended = (opt.key == best_opt.key)

        # 4. Rekomendasi Jam Berangkat Cerdas (Optimal Departure Window)
        # Hitung jika berangkat 30 menit lebih awal untuk menghindari puncak jam kantor
        earlier_mult, _ = AnalyticsService.get_traffic_multiplier(
            f"{max(5, dep_h - 1):02d}:{dep_m:02d}", day_type
        )
        saved_mins = int(car_dur * (traffic_mult - earlier_mult) / traffic_mult) if traffic_mult > 1.3 else 0
        
        opt_rec = OptimalTimeRecommendation(
            recommended_departure=f"{max(5, dep_h - 1):02d}:{dep_m:02d}" if saved_mins > 10 else departure_time,
            saved_minutes=max(0, saved_mins),
            advice=f"Berangkat sebelum puncak jam kerja ({max(5, dep_h - 1):02d}:{dep_m:02d}) menghemat ~{saved_mins} menit di jalan." if saved_mins > 10 else "Waktu keberangkatan Anda sudah berada di luar jam macet parah."
        )

        summary = RouteSummary(
            origin_resolved=origin_display,
            destination_resolved=dest_display,
            distance_km=round(dist_km, 2),
            base_duration_min=round(base_min, 1),
            weather_live=weather,
            planned_departure=f"{departure_time} WIB",
            day_status="Hari Kerja (Weekday)" if day_type == "weekday" else ("Akhir Pekan" if day_type == "weekend" else "Hari Libur"),
            traffic_status="Macet Padat" if is_rush else "Lancar / Normal",
            traffic_factor_desc=traffic_desc,
            optimal_window=opt_rec
        )

        return summary, raw_options