import React, { createContext, useState, useContext } from "react";

// 1. Khởi tạo context với giá trị mặc định
export const ThemeContext = createContext({
    theme: "light",
    toggleTheme: () => { }
});

// 2. Tạo provider để bao bọc ứng dụng
export const ThemeProvider = ({ children }) => {
    // State quản lý theme hiện tại
    const [theme, setTheme] = useState("light");

    // Hàm chuyển đổi theme
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    // Tạo object context chứa giá trị và hàm chuyển đổi
    const contextValue = {
        theme,
        toggleTheme
    };

    // 3. Cung cấp giá trị context cho các component con
    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

// 4. Custom hook để sử dụng context dễ dàng hơn
export const useTheme = () => {
    const context = useContext(ThemeContext); // Lấy giá trị context hiện tại
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
