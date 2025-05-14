import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaSignOutAlt, FaCamera, FaBoxOpen } from 'react-icons/fa';
import { Avatar, IconButton, Menu, MenuItem, Tooltip, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DEFAULT_AVATAR = './default-avatar.png';

const UserProfile = ({ user, onLogout, onViewProfile, onImageUpload }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileImage, setProfileImage] = useState(user?.profileImage || DEFAULT_AVATAR);
  const inputRef = useRef();
  const navigate = useNavigate();

  // Actualiza la imagen cuando cambia el usuario
  useEffect(() => {
    setProfileImage(user?.profileImage || DEFAULT_AVATAR);
  }, [user]);

  if (!user) {
    return null; // No renderizar si no hay usuario
  }

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Vista previa inmediata
        if (onImageUpload) onImageUpload(file, reader.result); // Callback para subir imagen
      };
      reader.readAsDataURL(file);
    }
    handleMenuClose();
  };

  return (
    <>
      <Tooltip title={user.displayName || 'Configuración de cuenta'}>
        <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 2 }}>
          <Avatar src={profileImage} alt={user.displayName || 'Usuario'} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 4,
          sx: { mt: 1.5, minWidth: 220 },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem disabled>
          <Avatar src={profileImage} sx={{ mr: 1 }} />
          <Typography>{user.displayName || 'Usuario'}</Typography>
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => inputRef.current.click()}>
          <FaCamera style={{ marginRight: '8px' }} />
          Cambiar foto de perfil
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </MenuItem>

        <MenuItem onClick={() => { handleMenuClose(); navigate('/pedidos'); }}>
          <FaBoxOpen style={{ marginRight: '8px' }} />
          Tus pedidos
        </MenuItem>

        <MenuItem onClick={() => { handleMenuClose(); if (onViewProfile) onViewProfile(); }}>
          <FaUserCircle style={{ marginRight: '8px' }} />
          Ver perfil
        </MenuItem>

        <MenuItem onClick={() => { handleMenuClose(); if (onLogout) onLogout(); }}>
          <FaSignOutAlt style={{ marginRight: '8px' }} />
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserProfile;
