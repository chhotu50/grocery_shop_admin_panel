import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
    return (
        <CFooter fixed={false}>
            <div>
                <a href="https://www.pixlerlab.com" target="_blank" rel="noopener noreferrer">
                    PIXLERLAB
                </a>
                <span className="ml-1">&copy; 202! pixlerlab</span>
            </div>
            <div className="mfs-auto">
                <span className="mr-1">Powered by</span>
                <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
                    PIXLERLAB
                </a>
            </div>
        </CFooter>
    );
};

export default React.memo(TheFooter);
