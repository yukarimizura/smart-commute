import React, { useState, useRef, useEffect } from 'react'
import UserSettingsModal from '../profile/UserSettingsModal'
import ProfileTrigger from './profiledropdown/ProfileTrigger'
import ProfileMenu from './profiledropdown/ProfileMenu'

export default function ProfileDropdown({ currentUser, onLogout, onUpdateUser }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialTab, setInitialTab] = useState('profile')
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleOpenModal = (tab = 'profile') => {
    setInitialTab(tab)
    setIsOpen(false)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="relative select-none" ref={menuRef}>
        <ProfileTrigger
          currentUser={currentUser}
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <ProfileMenu
            currentUser={currentUser}
            onOpenModal={handleOpenModal}
            onLogout={() => {
              setIsOpen(false)
              onLogout()
            }}
          />
        )}
      </div>

      <UserSettingsModal
        isOpen={isModalOpen}
        initialTab={initialTab}
        onClose={() => setIsModalOpen(false)}
        currentUser={currentUser}
        onUpdateUser={onUpdateUser}
      />
    </>
  )
}