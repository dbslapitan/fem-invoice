import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

const isSystemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
let darkMode = localStorage.getItem('isDarkMode');
const body = document.body;
if(!darkMode){
  localStorage.setItem('isDarkMode', isSystemDarkMode.toString());
  darkMode = isSystemDarkMode.toString();
}

const isDarkMode = darkMode === 'true';

if(isDarkMode && !body.classList.contains('dark-mode')){
  body.classList.add('dark-mode');
}
else {
  if(body.classList.contains('dark-mode')){
    body.classList.remove('dark-mode');
  }
}
