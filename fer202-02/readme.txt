PRACTICAL EXAMINATION 02 - FER202

Installed Packages:
- axios
- bootstrap
- react-bootstrap
- react-icons
- react-router-dom
- json-server (dev dependency)

How to run the application:
1. Extract the project folder.
2. Run 'npm install' to install dependencies (if node_modules is missing).
3. Start the JSON Server by running:
   npm run server
   (This will start the server on http://localhost:9999)
4. In a separate terminal, start the React application by running:
   npm start
5. Open http://localhost:3000 in your browser.

Login credentials for testing:
- Admin: fudn@fptu.edu.vn / 123456 or admin / 123456
- User: thanhdat@mail.com / 123456 (Access denied for list page)

Project Structure:
- src/components: Reusable UI components (MessageModal, ConfirmModal, FilterBar, ToastMessage)
- src/contexts: State management (AuthContext with useReducer)
- src/pages: Application pages (Login, AccountList, AccountDetails)
- src/services: API services (axios configuration)
- src/App.js: Routing and component assembly
