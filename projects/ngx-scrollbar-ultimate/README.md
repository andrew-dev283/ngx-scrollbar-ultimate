# ngx-scrollbar-ultimate

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.2.

## Description

This is a very lightweight library for vertical scrolling. 

This library does not require third party dependencies

### USAGE

1. Install

   ```bash
   npm i ngx-scrollbar-ultimate or 
   ```
   OR

   ```bash
   yarn add ngx-scrollbar-ultimate
   ```

2. Import to your component or module this component:

   ```bash
   NgxScrollbarUltimateComponent
   ```
   
3. Add to your code:

   ```bash
   <div class="container">
     <ngx-scrollbar-ultimate>
        your content
     </ngx-scrollbar-ultimate>
   </div>
   ```
   IMPORTANT: scrollbar supports setting **height** or **max-height** to parent container
   FULL EXAMPLE:
   ```bash
    <div class="container">
      <ngx-scrollbar-ultimate>
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
          eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
          quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </div>
      </ngx-scrollbar-ultimate>
    </div>
    ```
   
   ```bash
   .container {
      border: 1px solid black;
      width: 300px;
      height: 300px; /* or max-height */
   }

   .content {
      box-sizing: border-box;
      padding: 8px;
   }
   ```
   
4. Add visibility 'hover', if you need.

   ```bash
   <ngx-scrollbar-ultimate visibility = 'hover'>
        your content
   </ngx-scrollbar-ultimate>
   ```

## Keywords
scrollbar, angular


## 💸 Support project

[![Cryptodonat](https://img.shields.io/badge/Donate-Crypto-green?logo=bitcoin)](https://andrew-dev283.github.io/andrew-dev.github.io/)

OR

https://boosty.to/hq_dev
