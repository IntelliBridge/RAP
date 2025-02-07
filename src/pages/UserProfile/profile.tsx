import { useEffect } from "react";
import PageTemplate from "../../../layouts/PageTemplate";
import { Grid, GridContainer } from "@trussworks/react-uswds";


//user data consts
//all strings
const obj = localStorage.getItem('user');
const info = JSON.parse(obj);
const first_name = info.first_name;
const last_name = info.last_name;
const affiliation = info.affiliation;
const org = info.org;
const pay_grade = info.pay_grade;
const email = info.email;
const user = info.username;




export default function Profile() {
    useEffect(() => {
      document.title = "Mito | Profile";
    }, []);


    const defaultContent = (
        <div className="profileContent">
            <GridContainer className="usa-section" containerSize="desktop">
                <Grid row className="margin-x-neg-205 flex-justify-center">
                    <Grid col={6}>
                        <div className="usa-prose-h1">
                            <h1>{first_name} {last_name} Profile</h1>
                        </div>

                        {/* start of user data */}
                        <div className="usa-prose-h6">
                            <h6 className="margin-bottom-0">Name</h6>
                            <p className="margin-top-0">{ first_name } { last_name }</p>
                        </div>

                        <div className="usa-prose-h6">
                            <h6 className="margin-bottom-0">Affiliation</h6>
                            <p className="margin-top-0">{ affiliation }</p>
                        </div>
                        
                        <div className="usa-prose-h6">
                            <h6 className="margin-bottom-0">Pay Grade</h6>
                            <p className="margin-top-0">{ pay_grade }</p>
                        </div>

                        <div className="usa-prose-h6">
                            <h6 className="margin-bottom-0">Unit, Organization or Company Name</h6>
                            <p className="margin-top-0">{ org }</p>
                        </div>
                        

                        <div className="usa-prose-h6">
                            <h6 className="margin-bottom-0">Username</h6>
                            <p className="margin-top-0">{ user }</p>
                        </div>
                        
                        <div className="usa-prose-h6">
                            <h6 className="margin-bottom-0">Email</h6>
                            <p className="margin-top-0"> { email }</p>
                        </div>
                        

                        <div className="usa-prose-h6">
                            <h6 className="margin-bottom-0">Access Request Notes</h6>
                            {/*placeholder text*/}
                            <p className="margin-top-0">Lorem ipsum dolor sit amet consectetur. Aliquam velit quam diam iaculis et eu. Duis velit tellus pellentesque sed. Euismod ultricies amet lectus blandit in adipiscing praesent sit eget. Sapien vitae nisl eu nisl nisi eleifend ut morbi sed.</p>
                        </div>
                        
                    </Grid>
                </Grid>
            </GridContainer>
        </div>
    )
    return <PageTemplate mainContent={defaultContent} isDashboard={true}/>;
}
