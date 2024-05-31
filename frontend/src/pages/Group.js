import React from "react";
import GroupForm from "../components/GroupForm";
import GroupList from "../components/GroupList";
import GroupTransactions from "../components/GroupTransaction";

const  Group = () => {
    return (
       <div>
          <div className="my-4">
            <GroupList />
            
          </div>
          <div className="my-4">
            <GroupForm />
            
          </div>
          <div className="my-4">
            <GroupTransactions />
          </div>
        </div>
      );
    };
 export default Group;