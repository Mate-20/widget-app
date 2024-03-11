import React from 'react'
import { useState } from 'react';
import styles from './homepage.style.module.css'
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const [theme, selectTheme] = useState("dark");
  const [layout, selectLayout] = useState("grid");

  const navigate = useNavigate()

  const handleThemeChange = (event) => {
    selectTheme(event.target.value);
  };

  const handleLayoutChange = (event) => {
    selectLayout(event.target.value);
  };
  const handleNextClick = () => {
      navigate('/data', { state: { theme, layout } });
    };

  return (
    <div className={styles.container}>
      <div className={styles.glass_container}>
            <div className={styles.layout}>
              <label>Layout : </label>
              <input
                type="radio"
                id="grid"
                name="layout"
                value="grid"
                checked={layout === "grid"}
                onChange={handleLayoutChange}
              />
              <label htmlFor="grid">Grid</label>
              <input
                type="radio"
                id="navbar"
                name="layout"
                value="navbar"
                checked={layout === "navbar"}
                onChange={handleLayoutChange}
              />
              <label htmlFor="navbar">Navbar</label>
              <input
                type="radio"
                id="sidebar"
                name="layout"
                value="sidebar"
                checked={layout === "sidebar"}
                onChange={handleLayoutChange}
              />
              <label htmlFor="sidebar">Sidebar</label>
            </div>
            <div className={styles.layout}>
              <label>Theme : </label>
              <input
                type="radio"
                id="dark"
                name="theme"
                value="dark"
                checked={theme === "dark"}
                onChange={handleThemeChange}
              />
              <label htmlFor="dark">Dark</label>
              <input
                type="radio"
                id="light"
                name="theme"
                value="light"
                checked={theme === "light"}
                onChange={handleThemeChange}
              />
              <label htmlFor="light">Light</label>
            </div>
            <button onClick={handleNextClick} className={styles.btn}>Next</button>
        </div>
    </div>
  );
}

export default HomePage

