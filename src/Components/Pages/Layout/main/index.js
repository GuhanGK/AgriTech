import React, { useEffect, useState } from "react";
import LayoutStyle from "./style";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "../../Footer";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { Row, Navbar } from "react-bootstrap";
import { Button, Popover } from 'antd';
import { useDispatch } from "react-redux";
import { setUserData } from "../../../../Redux/AuthRedux";
import CropImg from "../../../../Assets/Images/cropImg.png";
import PestImg from "../../../../Assets/Images/pestImg.png";
import SoilImg from "../../../../Assets/Images/soiltesting.png";
import Admin from "../../../../Assets/Images/admin.png";
import Dashboard from "../../../../Assets/Images/dashboard.png";
const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Layout = () => {
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const dispatch = useDispatch();  
    const navigate = useNavigate(); 
    let role = localStorage.getItem('isAdmin');
 

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log("Login ~ isLoggedIn---->", isLoggedIn)
  
  
    useEffect(()=>{
      if(!isLoggedIn){
        navigate("/login");
      }     
    },[isLoggedIn]);

    const handleDrawerClose = () => {
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = (e) => {
        e.preventDefault()
    };

    const handleDrawerOpen = () => {
        setMobileOpen(!mobileOpen);
    };

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const logoutHandler = async()=>{
        localStorage.setItem("isAdmin", "");
        localStorage.setItem("isLoggedIn", false);
        localStorage.setItem("user", "");
        localStorage.setItem("userData", "");
        dispatch(setUserData(""));
        navigate("/login");

    }

    let menuItems = [
        { text: 'Dashboard', icon: <img src={Dashboard} alt="Dashboard" width={25}/>, to:"/" },
        { text: 'Crop Management', icon: <img src={CropImg} alt="Crop Management" width={25}/>, to:"/crop-management" },
        { text: 'Pest detection', icon: <img src={PestImg} alt="Crop Management" width={25}/> ,to:"/pest-detection"},
        { text: 'Soil testing', icon: <img src={SoilImg} alt="Crop Management" width={25}/>, to:"/soil-testing" },
    ];
    if(role === "Admin"){
        menuItems = [{ text: 'Admin', icon: <img src={Admin} alt="Admin" width={25}/>, to:"/admin" }]
    }
    let data = localStorage.getItem('userData');
    let user;
    if(data){
        user = JSON.parse(data);
    }
    const content = (
        <div>
          <p>Name : {user?.name}</p>
          <p>Email: {user?.emailId}</p>
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      );
    return (
        <LayoutStyle mobileOpen={mobileOpen}>
            <Box>
                <CssBaseline />
                <AppBar position="sticky" open={mobileOpen}>
                    <Toolbar className="header_toolbar_container">
                        <div
                            className="header_toolbar_items"
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(mobileOpen && { display: 'none' }),
                            }}
                        >
                            <div className="menu_icon_section">
                                {!mobileOpen && <MenuIcon className="header_menu_icon" onClick={handleDrawerOpen} />}
                                <p className="project_header" onClick={()=>navigate('/')}>AgriTech</p>
                            </div>

                            <Row className="header_navbar_container">
                                <Navbar collapseOnSelect expand="lg" className="navbar_container">
                                    {/* <Nav className="header_navbar_items">
                                        <Nav.Link href="#home" className="navbar_list_item">Home</Nav.Link>
                                        <Nav.Link href="#features" className="navbar_list_item">Features</Nav.Link>
                                        <Nav.Link href="#pricing" className="navbar_list_item">Pricing</Nav.Link>
                                    </Nav> */}
                                    <div className="profile_wrapp">
                                        <div>Hi {user?.name}!</div>
                                            {/* <Popover content={content} title="Title" trigger="click">
                                                <div className="profile_circle">  
                                                    {user?.name[0]}
                                                </div>
                                            </Popover>  */}
                                            <Popover content={content} trigger="click" placement="bottomLeft" getPopupContainer={(triggerNode) => triggerNode.parentNode}>
                                                <div className="profile_circle">  
                                                    {user?.name[0]}
                                                </div>
                                            </Popover> 
                                    </div>
                                </Navbar>
                            </Row>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    className="sidebar_drawer"
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    title={item.text}
                                    to={item.to}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: mobileOpen ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: mobileOpen ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} sx={{ display: mobileOpen ? "block" : "none" }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Box component="main" className="main_outlet_container" sx={{ flexGrow: 1, p: 3 }}>
                    <Outlet />
                    {/* <Footer /> */}
                </Box>
            </Box>
        </LayoutStyle>
    );
}

export default Layout;
