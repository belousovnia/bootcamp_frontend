import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

type NavItem = {
  path: string;
  title: string;
};

interface AdminSidebarProps {
  navItems: NavItem[];
}

export const AdminSidebar = ({ navItems }: AdminSidebarProps) => {
  const location = useLocation();
  return (
    <aside>
      <List sx={{ display: { xs: 'flex', md: 'block' }, flexWrap: 'wrap' }}>
        {navItems.map((item) => (
          <ListItem key={item.path} sx={{ width: { xs: '50%', md: '100%' } }}>
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              selected={location.pathname.includes(item.path)}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </aside>
  );
};
