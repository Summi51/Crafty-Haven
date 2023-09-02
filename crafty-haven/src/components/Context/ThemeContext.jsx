// // import { createContext, useState } from "react";

// // export const Theme = createContext()

// // function ThemeContext({children}){

// //     const [theme, setTheme] = useState('light')
    
// //     const funTheme = () =>{
// //         setTheme(theme==='light'? 'dark' : 'light')
// //     }

// //     return(
// //        <Theme.Provider value={{theme, funTheme}}>
// //         {children}
// //        </Theme.Provider>
// //     )
// // }

// // export default ThemeContext;


// //_______________________________________________________________________
// //gpt code
// // ThemeContext.jsx

// import { createContext, useState } from "react";
// import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";

// export const ThemeContext = createContext();

// const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState("light");

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   const chakraTheme = extendTheme({
//     styles: {
//       global: {
//         body: {
//           bg: theme === "light" ? "white" : "black",
//           color: theme === "light" ? "black" : "white",
//         },
//       },
//     },
//   });

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       <ChakraProvider theme={chakraTheme}>
//         <CSSReset />
//         {children}
//       </ChakraProvider>
//     </ThemeContext.Provider>
//   );
// };

// export default ThemeProvider;
