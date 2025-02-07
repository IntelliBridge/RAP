import React, { useState, useEffect } from 'react';
import NumberViz from './Charts/NumbersViz';
import EqualSizeDataViz from './Charts/EqualSizeDataViz';
import UnequalSizeDataViz from './Charts/UnequalSizeDataViz';
import DoughnutChart from '../../../components/Doughnut/Doughnut';
import './styles.scss';
import {
  Select
} from "@trussworks/react-uswds";

type DataItem = {
  status: string;
};

type DeconflictionItem = {
  active: boolean;
};

interface DashboardTopLevelProps {
  data?: DataItem[];
  deconflictionData?: DeconflictionItem[];
}

interface UserRoles {
  [key: string]: string;
}

const userRoles: UserRoles = {
  '0': "Top Secret",
  '1': "Secret",
  '2': "Unclassified",
  '3': "User",
  '4': "Guest"
};

const DashboardTopLevel: React.FC<DashboardTopLevelProps> = ({ data = [], deconflictionData = [] }) => {
  // State to hold userRole
  const [userRole, setUserRole] = useState(localStorage.getItem('user-role') || '0');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Display role based on selected userRole
  const displayRole = userRoles[userRole] || "Role not found";

  // Effect to sync userRole state with localStorage
  useEffect(() => {
    localStorage.setItem('user-role', userRole);
  }, [userRole]);

  // Handle select change
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(event.target.value);
  };

  // Filter active deconflictions
  const activeDeconflictions = deconflictionData.filter((item) => item.active === true);
  const closedOperation = data.filter((item) => item.status === "Closed");

  const numberVizData = [
    {
      type: {
        name: "Flagged",
        value: activeDeconflictions.length,
        color: "alert",
      },
    },
    {
      type: {
        name: "Submissions",
        value: data.length,
        color: "primary",
      },
    },
    {
      type: {
        name: "Closed",
        value: closedOperation.length,
        color: "inactive",
      },
    },
  ];

  const OperationOverview = [
    {
      type: {
        name: "In Review",
        value: 6,
        color: "in-review",
      },
    },
    {
      type: {
        name: "Submissions",
        value: 19,
        color: "primary",
      },
    },
    {
      type: {
        name: "Drafts",
        value: 4,
        color: "draft",
      },
    },
    {
      type: {
        name: "Closed",
        value: 24,
        color: "inactive",
      },
    },
  ];

  const CAGEcodeData = [
    {
      type: {
        value: 3432,
        color: "primary-light",
        reference: {
          name: "123456",
          link: "",
        },
      },
    },
    {
      type: {
        value: 3198,
        color: "primary",
        reference: {
          name: "123456",
          link: "",
        },
      },
    },
    {
      type: {
        value: 2870,
        color: "green-light",
        reference: {
          name: "123456",
          link: "",
        },
      },
    },
    {
      type: {
        value: 1921,
        color: "green",
        reference: {
          name: "123456",
          link: "",
        },
      },
    },
    {
      type: {
        value: 1577,
        color: "tan-light",
        reference: {
          name: "123456",
          link: "",
        },
      },
    },
  ];

  const NetworkActivity = [
    {
      type: {
        value: 101,
        color: "primary-light",
        reference: {
          name: "JWICK",
          link: "",
        },
      },
    },
    {
      type: {
        value: 70,
        color: "primary",
        reference: {
          name: "SIPRNet",
          link: "",
        },
      },
    },
    {
      type: {
        value: 120,
        color: "green-light",
        reference: {
          name: "NIPRNet",
          link: "",
        },
      },
    },
  ];

  return (
    <>
      <h1>Hello {user.first_name} ({displayRole}), your highlights:</h1>
      <div className="role-selector">
        <Select id="user-role" name="user-role-selector" value={userRole} onChange={handleRoleChange}>
          <option> - Select - </option>
          <option value="0">Top Secret</option>
          <option value="1">Secret</option>
          <option value="2">Unclassified</option>
        </Select>
      </div>
      
      <div className="overview-viz">
      {userRole === '0' || userRole === '2' && data.length > 0 && deconflictionData.length > 0 ?(
        
            <NumberViz
              data={numberVizData}
              heading={"Operations Flagged/Submitted/Closed"}
              label={"System-identified potential conflicts that need your attention."}
            />
          ) : (
            null
          )}

  {userRole === '1' ?(
        
        <NumberViz
          data={OperationOverview}
          heading={"Operations Overview"}
          label={"Status of submitted operations <strong>In Review</strong> by Mito, <strong>Submissions</strong>, <strong>Drafts</strong> in progress, and <strong>Closed</strong>"}
        />
      ) : (
        null
      )}

        <EqualSizeDataViz
          data={CAGEcodeData}
          heading={"Operation CAGE Code"}
          label={"The top five <strong>CAGE codes</strong> having the highest level operation activity across Mito"}
        />
        {userRole === '0' || userRole ==="2" ?(
        <UnequalSizeDataViz
          data={NetworkActivity}
          heading={"Network Activity"}
          label={"Number of operations across JWICS, SIPRNet, and NIPRNet communication networks."}
        />
        ):(
          null
        )}
        {userRole === '0' || userRole === '1' ? (
          <div className="doughnut-chart-container">
            <div className="heading">Analyst Capacity</div>
            <div className="label">Current analysts workload versus overall capacity</div>
            <DoughnutChart percent={92} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DashboardTopLevel;
