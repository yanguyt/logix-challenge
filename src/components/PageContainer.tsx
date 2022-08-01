import React from "react";

const PageContainer: React.FC = ({children}) => {
    return (
        <div className="page-container">
            {children}
        </div>
    )
}

export default PageContainer