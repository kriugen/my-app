import { getCookie, setCookies } from "cookies-next";
import React, { useEffect, useState } from "react";

function ThemeSwitch() {
  const COOKIE = 'myblogtheme'; 
  const [theme, setTheme] = useState('light');
  const changeTheme = (theme: string) => {
    setTheme(theme);
    setCookies(COOKIE, theme)
  };

  useEffect(() => {
    const theme: any = getCookie(COOKIE);
    if (theme) {
      setTheme(theme);
    }
  }, []);

  useEffect(() => {
    document?.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost rounded-btn">Theme</label>
      <ul tabIndex={0} className="p-2 mt-4 shadow menu dropdown-content bg-base-100 rounded-box w-52">
        <li><button onClick={() => changeTheme('garden')}>Garden</button></li> 
        <li><button onClick={() => changeTheme('light')}>Light</button></li> 
        <li><button onClick={() => changeTheme('dark')}>Dark</button></li> 
      </ul>
    </div>
  );
}

export default ThemeSwitch;