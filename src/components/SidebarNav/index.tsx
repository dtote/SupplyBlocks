import {
  colors,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ApplicationRoutes,
  DashboardRoutes,
  dashboardRoutes,
  ExtendedRoute
} from '../../routes';

const StyledList = styled(List)(({ theme }) => ({
  marginBottom: theme.spacing(2)
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: colors.blueGrey[800],
  padding: '6px 8px',
  justifyContent: 'flex-start',
  textTransform: 'none',
  letterSpacing: 0,
  width: '100%',
  fontWeight: theme.typography.fontWeightMedium as number,
  cursor: 'pointer',
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0.5, 0),
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  width: 24,
  minWidth: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(1)
}));

interface Props {
  pages: DashboardRoutes;
}

const SidebarNav: React.FC<Props> = (props) => {
  const { pages } = props;

  const history = useHistory();
  const [active, setActive] = useState(history.location.pathname);

  useEffect(() => {
    if (active === ApplicationRoutes.dashboard.path) {
      setActive(dashboardRoutes.companies.path);
      history.push(dashboardRoutes.companies.path);
    }
  }, [active, history]);

  const clickCallback = useCallback(
    (page: ExtendedRoute) => (
      event: React.MouseEvent<HTMLLIElement, MouseEvent>
    ) => {
      setActive(page.path);
      history.push(page.path);
    },
    [history]
  );

  useEffect(() => {
    setActive(history.location.pathname);
  }, [history.location]);

  return (
    <StyledList>
      {Object.keys(pages).map((key, index) => {
        const page = pages[key];
        const activePage = page.path === active;
        return (
          <Tooltip key={index} title={page.label} aria-label={page.label}>
            <StyledListItem
              onClick={clickCallback(page)}
              sx={{
                color: activePage ? 'secondary.main' : 'inherit'
              }}
            >
              <StyledListItemIcon
                sx={{
                  color: activePage ? 'secondary.main' : 'inherit'
                }}
              >
                {page.icon}
              </StyledListItemIcon>
              <ListItemText
                primary={page.label}
                sx={{
                  '& span': {
                    fontSize: activePage ? 18 : 16
                  }
                }}
              />
            </StyledListItem>
          </Tooltip>
        );
      })}
    </StyledList>
  );
};

export default SidebarNav;
