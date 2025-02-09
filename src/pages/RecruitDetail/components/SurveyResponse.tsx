import React from "react";
import { Button, Grid, Table } from "@trussworks/react-uswds";
import "./surveyresponse.scss";
import Accordion from "../../../Components/Accordion/Accordion";
import ProgressBar from "./BarWithChart";

const SurveyResponse = (recruit: JSON) => {
  console.log(recruit);
  const accordionItems = [
    {
      title: (
        <>
          <div className="survey-response-accordion">
            <div className="title">Military</div>
            <ProgressBar value={recruit.recruit.overall_wellness.military}></ProgressBar>
          </div>
        </>
      ),
      content: (
        <Grid row gap>
          <Grid className="survey-response-main" col={8}>
            <div className="section">
              <p className="headline">Military service can provide numerous benefits, including job training, educational opportunities, and a sense of purpose. However, it can also come with challenges such as adjusting to military life, exposure to dangerous situations, and long periods away from family and friends.</p>
              <p>It is essential to understand the responsibilities and expectations that come with military service, including discipline, physical readiness, and teamwork. Preparing for these aspects can help you succeed both during and after your time in the military.</p>
              <p>The Department of Defense offers various resources to assist service members, including counseling services, financial planning, and family support programs.</p>
              <p className="citation">— U.S. Department of Defense</p>
            </div>
            <div className="section blk-bg">
              <div className="header">Military-Specific Support</div>
              <p>For more information on military-specific programs and support services, visit <a href="military-support.mil">military-support.mil</a> or call (800) 555-1234 for assistance with career and family services.</p>
            </div>
            <div className="section">
              <div className="header-table">
                Your response(s)
              </div>
              <Table  striped>
                <tbody>
                  {Object.entries(recruit.recruit.survey['Military Specific']).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Grid>
          <Grid className="survey-response-side-content" col={4}>
            <div className="section">
              <div className="blk-bg">
                <div className="side-header">Military Specific Support Options:</div>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Military Assistance Programs:</strong></p>
                <p><strong>Veterans Crisis Line:</strong> 1-800-273-8255 (Press 1) provides confidential support for veterans and their families. It’s available 24/7 to offer immediate assistance​ (VA.gov)​.</p>
                <p><strong>Military OneSource:</strong> A toll-free service that offers free, confidential counseling and a range of resources on military life, relocation, financial advice, and more. Call 1-800-342-9647​ (Military OneSource)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Online Resources:</strong></p>
                <p><strong>MyArmyBenefits:</strong> A website offering personalized benefits information, from pay and allowances to family support and legal assistance​ (MyArmyBenefits)​.</p>
                <p><strong>Military Health System (MHS) Resources:</strong> Provides health care information, access to services, and treatment options tailored to service members​ (MHS)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Counseling and Support Groups:</strong></p>
                <p>Many military installations have counseling services, support groups, and peer mentors to help service members transition and deal with stress, PTSD, or relationship issues​ (Military.com)​.</p>
              </div>
            </div>

          </Grid>
        </Grid>
      ),
    },
    {
      title: (
        <>
          <div className="survey-response-accordion">
            <div className="title">Family</div>
            <ProgressBar value={recruit.recruit.overall_wellness.family}></ProgressBar>
          </div>
        </>
      ),
      content: (
        <Grid row gap>
          <Grid className="survey-response-main" col={8}>
            <div className="section">
            <p className="headline">
              The military lifestyle can have a significant impact on families, with frequent moves, deployments, and long periods of separation. It’s important to understand the support available to help families navigate these challenges.
            </p>
            <p>
              Military families often face unique stressors, but there are numerous resources to support them, including counseling, family readiness programs, and relocation assistance. Ensuring that your family is prepared and supported is key to managing military life.
            </p>
            <p>
              There are also programs available to help families stay connected during deployments and transitions. These programs focus on emotional, logistical, and financial support to make military life easier for families.
            </p>
            <p className="citation">— U.S. Department of Defense</p>
            </div>
            <div className="section blk-bg">
              <div className="header">Family Support Services</div>
              <p>For more information on family support programs, visit <a href="military-family.mil">military-family.mil</a> or call (800) 555-7890 for assistance with family readiness and support services.</p>
            </div>
            <div className="section">
              <div className="header-table">
                Your response(s)
              </div>
              <Table  striped>
                <tbody>
                  {Object.entries(recruit.recruit.survey.Family).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Grid>
          <Grid className="survey-response-side-content" col={4}>
            <div className="section">
              <div className="blk-bg">
                <div className="side-header">Family Support Options:</div>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Hotlines and Text Support:</strong></p>
                <p><strong>Military OneSource:</strong> 1-800-342-9647 provides confidential support for military families, including resources on counseling, relocation assistance, and parenting​ (Military OneSource)​.</p>
                <p><strong>Veterans Crisis Line:</strong> 1-800-273-8255 (Press 1) offers confidential support for veterans and their families dealing with mental health crises or emotional distress​ (Veterans Affairs)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Smartphone Apps:</strong></p>
                <p><strong>MyArmyBenefits:</strong> An app that helps military families understand their benefits, including healthcare, education, and housing​ (MyArmyBenefits)​.</p>
                <p><strong>Military Family App:</strong> An app providing resources and tools to assist families with deployments, family readiness, and support networks​ (MilitaryFamily.org)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Online Resources:</strong></p>
                <p><strong>Military Family Support Center:</strong> Offers a range of support services for families of military personnel, including counseling, educational resources, and financial assistance​ (MilitaryFamilies.mil)​.</p>
                <p><strong>Family Readiness Group (FRG):</strong> A military unit resource that connects family members to support services, updates, and community events​ (Army.mil)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Counseling and Support Groups:</strong></p>
                <p>Many military installations offer counseling services and support groups for families, especially to help them cope with deployments, reintegration, and other challenges​ (Military.com)​.</p>
              </div>
            </div>

          </Grid>
        </Grid>
      ),
    },
    {
      title: (
        <>
          <div className="survey-response-accordion">
            <div className="title">Physical Health</div>
            <ProgressBar value={recruit.recruit.overall_wellness.physical}></ProgressBar>
          </div>
        </>
      ),
      content: (
        <Grid row gap>
          <Grid className="survey-response-main" col={8}>
            <div className="section">
            <p className="headline">
              Maintaining physical health is crucial for military readiness and overall well-being. Regular exercise, proper nutrition, and injury prevention are key factors in sustaining a healthy lifestyle throughout your service.
            </p>
            <p>
              The military places a strong emphasis on physical fitness, and it is vital for service members to stay in good shape to meet the demands of training and duty. Physical health also plays an important role in preventing chronic conditions and ensuring peak performance.
            </p>
            <p>
              If you encounter any physical health challenges, there are various resources available, including fitness programs, medical treatment options, and rehabilitation services to ensure you stay healthy and mission-ready.
            </p>
            <p className="citation">— U.S. Department of Defense</p>
            </div>
            <div className="section blk-bg">
              <div className="header">Physical Health Support</div>
              <p>For more information about physical fitness and health programs, visit <a href="military-physicalhealth.mil">military-physicalhealth.mil</a> or call (800) 555-2345 to speak with a health professional about fitness and treatment options.</p>
            </div>
 
            <div className="section">
              <div className="header-table">
                Your response(s)
              </div>
              <Table  striped>
                <tbody>
                  {Object.entries(recruit.recruit.survey['Physical Health']).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Grid>
          <Grid className="survey-response-side-content" col={4}>
            <div className="section">
              <div className="blk-bg">
                <div className="side-header">Physical Health Support Options:</div>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Hotlines and Text Support:</strong></p>
                <p><strong>Military Health Line:</strong> 1-800-874-2273 offers support for physical health concerns, including injury treatment, fitness advice, and wellness resources​ (TRICARE)​.</p>
                <p><strong>National Health Service (NHS) Health Information:</strong> Call 1-800-222-1222 for general health advice and information on physical health services available in your area​ (CDC)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Smartphone Apps:</strong></p>
                <p><strong>ArmyFit:</strong> An app that provides tailored fitness programs, tracks physical readiness, and helps you meet Army fitness standards​ (Army.mil)​.</p>
                <p><strong>Fitbit and MyFitnessPal:</strong> Popular apps that help track physical activity, nutrition, and overall health goals to support your fitness journey​ (Fitbit, MyFitnessPal)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Online Resources:</strong></p>
                <p><strong>Health.mil:</strong> A website that provides health and wellness information, fitness guidelines, and military-specific health care resources​ (Health.mil)​.</p>
                <p><strong>TRICARE Physical Health Resources:</strong> Offers guidelines on physical health services, wellness programs, and preventive care options​ (TRICARE.mil)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Counseling and Support Groups:</strong></p>
                <p>Many military installations offer counseling services and physical therapy for injuries, rehabilitation programs, and injury prevention strategies to support service members​ (Military.com)​.</p>
              </div>
            </div>
          </Grid>
        </Grid>
      ),
    },
    {
      title: (
        <>
          <div className="survey-response-accordion">
            <div className="title">Medical Care</div>
            <ProgressBar value={recruit.recruit.overall_wellness.medical}></ProgressBar>
          </div>
        </>
      ),
      content: (
        <Grid row gap>
          <Grid className="survey-response-main" col={8}>
            <div className="section">
            <p className="headline">
              Access to high-quality medical care is crucial for the overall well-being of service members. Whether addressing common injuries, ongoing health conditions, or emergency medical needs, the military health system provides comprehensive care to those in uniform.
            </p>
            <p>
              The Military Health System (MHS) offers medical care at various facilities worldwide. From routine check-ups to specialized treatment, service members have access to a range of health services.
            </p>
            <p>
              If you're in need of medical assistance, it's important to be aware of the available resources and ensure you are registered with the appropriate military healthcare program.
            </p>
            <p className="citation">— U.S. Department of Veterans Affairs</p>
            </div>
            <div className="section blk-bg">
              <div className="header">Medical Care Services</div>
              <p>For more information about medical benefits, visit <a href="military-medical.mil">military-medical.mil</a> or call (800) 555-6789 to speak with a representative about medical coverage.</p>
            </div>

            <div className="section">
              <div className="header-table">
                Your response(s)
              </div>
              <Table  striped>
                <tbody>
                  {Object.entries(recruit.recruit.survey['Medical Care']).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Grid>
          <Grid className="survey-response-side-content" col={4}>
            <div className="section">
              <div className="blk-bg">
                <div className="side-header">Medical Care Support Options:</div>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Hotlines and Text Support:</strong></p>
                <p><strong>TRICARE Assistance Line:</strong> 1-877-874-2273 provides support for navigating medical care options, finding providers, and understanding your TRICARE benefits​ (TRICARE)​.</p>
                <p><strong>Veterans Affairs Medical Help Line:</strong> 1-877-222-8387 offers assistance for veterans seeking medical care and mental health services through the VA​ (VA.gov)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Smartphone Apps:</strong></p>
                <p><strong>TRICARE Online:</strong> The official TRICARE app that helps you access your medical appointments, prescription refills, and claims information​ (TRICARE)​.</p>
                <p><strong>MyHealtheVet:</strong> An app for veterans to manage their health records, track appointments, and refill prescriptions​ (VA.gov)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Online Resources:</strong></p>
                <p><strong>Health.mil:</strong> Provides comprehensive information on health care services available to military members and their families, including preventive care and treatment options​ (Health.mil)​.</p>
                <p><strong>VA Health Care:</strong> Offers information on the full spectrum of medical services available to veterans, from primary care to specialized treatments​ (VA.gov)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Counseling and Support Groups:</strong></p>
                <p>Military hospitals and health centers often provide counseling and support groups to help service members and their families navigate medical challenges, including mental health and injury rehabilitation​ (Military.com)​.</p>
              </div>
            </div>

          </Grid>
        </Grid>
      ),
    },
    {
      title: (
        <>
          <div className="survey-response-accordion">
            <div className="title">Mental Health</div>
            <ProgressBar value={recruit.recruit.overall_wellness.mental }></ProgressBar>
          </div>
        </>
      ),
      content: (
        <Grid row gap>
          <Grid className="survey-response-main" col={8}>
            <div className="section">
            <p className="headline">
              Mental health is just as important as physical health. Military service can place significant stress on service members, so it's essential to address any mental health challenges early on.
            </p>
            <p>
              There are numerous resources available to help military personnel manage stress, depression, PTSD, and other mental health issues. Seeking help is encouraged, and mental health services are confidential.
            </p>
            <p>
              Military life can present unique challenges, but there are mental health professionals ready to assist you with any concerns you may have. Your well-being is a priority.
            </p>
            <p className="citation">— National Institute of Mental Health</p>
            </div>
            <div className="section blk-bg">
              <div className="header">Mental Health Resources</div>
              <p>If you need mental health support, visit <a href="military-mentalhealth.mil">military-mentalhealth.mil</a> or call (800) 555-9876 for assistance and resources available to service members and their families.</p>
            </div>

            <div className="section">
              <div className="header-table">
                Your response(s)
              </div>
              <Table  striped>
                <tbody>
                  {Object.entries(recruit.recruit.survey['Mental Health']).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Grid>
          <Grid className="survey-response-side-content" col={4}>
            <div className="section">
              <div className="blk-bg">
                <div className="side-header">Mental Health Support Options:</div>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Hotlines and Text Support:</strong></p>
                <p><strong>Military Crisis Line:</strong> 1-800-273-8255 (Press 1) offers confidential support for veterans and service members dealing with mental health issues or emotional distress​ (Crisis Line)​.</p>
                <p><strong>Text “HOPE” to 741741:</strong> A free, 24/7 text line that connects service members with mental health support​ (Crisis Text Line)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Smartphone Apps:</strong></p>
                <p><strong>PTSD Coach:</strong> An app developed by the VA to provide tools and support for managing PTSD symptoms​ (PTSD Coach)​.</p>
                <p><strong>Calm and Headspace:</strong> These apps offer mindfulness and meditation exercises to help reduce stress, anxiety, and improve mental clarity​ (Headspace, Calm)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Online Resources and Guides:</strong></p>
                <p><strong>Vets4Warriors:</strong> A peer support network for veterans and service members providing anonymous, confidential help via phone or online chat​ (Vets4Warriors)​.</p>
                <p><strong>Military OneSource Mental Health Resources:</strong> Provides confidential mental health support, including counseling services and online resources​ (Military OneSource)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Counseling and Support Groups:</strong></p>
                <p>Many bases offer counseling services, both individual and group, to help military members and their families cope with mental health issues like stress, anxiety, and PTSD​ (Military.com)​.</p>
              </div>
            </div>

          </Grid>
        </Grid>
      ),
    },
    {
      title: (
        <>
          <div className="survey-response-accordion">
            <div className="title">Experiences</div>
            <ProgressBar value={recruit.recruit.overall_wellness.experience}></ProgressBar>
          </div>
        </>
      ),
      content: (
        <Grid row gap>
          <Grid className="survey-response-main" col={8}>
            <div className="section">
              <p className="headline">
                Your military experience may include a variety of challenges, from basic training to deployments. Each experience can shape your skills, resilience, and perspective.
              </p>
              <p>
                It’s important to reflect on the impact these experiences have had on your personal and professional development. Whether you’ve faced combat, adversity, or other challenges, each experience is part of your growth.
              </p>
              <p>
                The military offers resources to help service members adjust to the lifestyle and overcome obstacles they may encounter along the way.
              </p>
              <p className="citation">— U.S. Department of Defense</p>
              </div>
              <div className="section blk-bg">
                <div className="header">Support for Service Members</div>
                <p>For guidance on adjusting to military life and handling unique experiences, visit <a href="military-experience.mil">military-experience.mil</a> or call (800) 555-2468 for counseling and support services.</p>
              </div>

            <div className="section">
              <div className="header-table">
                Your response(s)
              </div>
              <Table  striped>
                <tbody>
                  {Object.entries(recruit.recruit.survey.Experiences).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Grid>
          <Grid className="survey-response-side-content" col={4}>
            <div className="section">
              <div className="blk-bg">
                <div className="side-header">Experience Support Options:</div>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Hotlines and Text Support:</strong></p>
                <p><strong>Military OneSource:</strong> 1-800-342-9647 provides confidential support for service members and their families, offering resources related to military experiences, transitions, and deployments​ (Military OneSource)​.</p>
                <p><strong>Veterans Crisis Line:</strong> 1-800-273-8255 (Press 1) offers immediate support to veterans and service members facing emotional or mental health crises related to their military experience​ (VA.gov)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Smartphone Apps:</strong></p>
                <p><strong>PTSD Coach:</strong> An app designed to help service members manage symptoms related to PTSD and other trauma through self-help tools and support options​ (VA.gov)​.</p>
                <p><strong>Veterans Affairs (VA) App:</strong> A comprehensive app for veterans to access their health care records, mental health resources, and more​ (VA.gov)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Online Resources:</strong></p>
                <p><strong>Vets4Warriors:</strong> A peer support network available 24/7 for veterans and service members to talk to someone who has shared similar experiences​ (Vets4Warriors)​.</p>
                <p><strong>Military.com:</strong> Offers resources for transitioning to civilian life, adjusting to military experiences, and managing military life challenges​ (Military.com)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Counseling and Support Groups:</strong></p>
                <p>Many military installations offer counseling services, support groups, and mentorship programs to help service members process their military experiences, including challenges related to deployments, reintegration, and more​ (Military.com)​.</p>
              </div>
            </div>

          </Grid>
        </Grid>
      ),
    },
    {
      title: (
        <>
          <div className="survey-response-accordion">
            <div className="title">Tobacco</div>
            <ProgressBar value={recruit.recruit.overall_wellness.tobacco}></ProgressBar>
          </div>
        </>
      ),
      content: (
        <Grid row gap>
          <Grid className="survey-response-main" col={8}>
            <div className="section">
              <p className="headline">
                Commercial tobacco use is the leading cause of preventable disease, disability, and death in the United States. Every day in the United States, about 1,600 young people under age 18 try their first cigarette, and nearly 200 end up smoking cigarettes daily.
              </p>
              <p>Some groups of people have a higher percentage of tobacco use, secondhand smoke exposure, and related health problems, as well as less access to treatment to help them quit. These disparities can be based on where people live, the kind of job they have, whether they have health insurance, and factors like race, ethnicity, age, or sexual orientation.</p>
              <p>Over 16 million people live with at least one disease caused by smoking, and smoking-related illness cost the United States more than $600 billion in 2018. These costs could be reduced if we prevent people from starting to use tobacco and help people who use tobacco quit.</p>
              <p className="citation">— Centers for Disease Control and Prevention (CDC)</p>
            </div>
            <div className="section blk-bg">
              <div className="header">USMC Health Benefits</div>
              <p>Information here about USMC medial benefits that might be available for assistance. Keep to USMC overall with contact info to find local services. Call (123) 345-7890 or visit <a href="usmc-benefits.mil">usmc-benefits.mil</a></p>
            </div>
            <div className="section">
              <div className="header-table">
                Your response(s)
              </div>
              <Table  striped>
                <tbody>
                  {Object.entries(recruit.recruit.survey.Tobacco).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Grid>
          <Grid className="survey-response-side-content" col={4}>
            <div className="section">
              <div className="blk-bg">
                <div className="side-header">Tobacco Cessation<br /> Support Options:</div>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Telephone Hotlines and Text Support:</strong></p>
                <p><strong>1-800-QUIT-NOW (1-800-784-8669)</strong>: A toll-free number connecting you to your state’s quitline with resources and support for quitting smoking​ (CDC)​.</p>
                <p><strong>SmokefreeTXT:</strong> A free service providing encouragement, advice, and tips via text messages to help you quit smoking. You can sign up by texting QUITNOW to 333888​ (CDC)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Smartphone Apps:</strong></p>
                <p><strong>quitSTART App:</strong> An app providing tailored tips, inspiration, and challenges to help you quit smoking​ (CDC)​.</p>
                <p><strong>Quit Genius and Kwit:</strong> These apps use cognitive behavioral therapy techniques and motivational strategies to support your quitting process. Quit Genius, for example, provides you with a personal quit coach if you opt for the premium version​ (Verywell Mind)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Online Resources and Guides:</strong></p>
                <p><strong>Smokefree.gov:</strong> Offers a variety of tools and resources, such as creating a personalized quit plan and learning how to manage cravings and withdrawal symptoms. It also provides information on nicotine replacement therapy (NRT)​ (Smokefree.gov)​​ (Smokefree.gov)​.</p>
                <p><strong>CDC’s Tips From Former Smokers campaign:</strong> Provides motivational stories and free resources to help you quit smoking. It features ads and educational materials tailored to diverse communities​ (CDC)​.</p>
                <p><strong>Nicotine Replacement Therapy (NRT):</strong> NRT products like nicotine gums, patches, and lozenges can double your chances of quitting successfully when used as directed. These are available over-the-counter, and some might be covered by insurance if prescribed by your doctor​ (www.heart.org)​​ (Smokefree.gov)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Counseling and Support Groups:</strong></p>
                <p>Many local hospitals, health centers, and communities offer smoking cessation programs that include counseling and group support meetings. These programs can significantly improve your chances of quitting by providing behavioral strategies and peer support​ (www.heart.org)​.</p>
              </div>
            </div>
          </Grid>
        </Grid>
      ),
    },
    {
      title: (
        <>
          <div className="survey-response-accordion">
            <div className="title">Alcohol</div>
            <ProgressBar value={recruit.recruit.overall_wellness.alcohol}></ProgressBar>
          </div>
        </>
      ),
      content: (
        <Grid row gap>
          <Grid className="survey-response-main" col={8}>
            <div className="section">
              <p className="headline">
                Alcohol use can have significant effects on your health, relationships, and military readiness. Understanding the impact of alcohol and managing consumption is crucial for maintaining your well-being and performance.
              </p>
              <p>
                If you feel that alcohol is affecting your life, there are programs available to help you quit or reduce consumption. The military offers various support services to ensure your health and success during service.
              </p>
              <p>
                Avoiding alcohol misuse is important not only for your health but also for your career and military readiness. Help is available for those who need it.
              </p>
              <p className="citation">— National Institute on Alcohol Abuse and Alcoholism</p>
              </div>
              <div className="section blk-bg">
                <div className="header">Alcohol Awareness and Support</div>
                <p>For more information on alcohol-related programs, visit <a href="military-alcohol.mil">military-alcohol.mil</a> or call (800) 555-5647 for confidential support.</p>
              </div>

            <div className="section">
              <div className="header-table">
                Your response(s)
              </div>
              <Table  striped>
                <tbody>
                  {Object.entries(recruit.recruit.survey.Alcohol).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Grid>
          <Grid className="survey-response-side-content" col={4}>
            <div className="section">
              <div className="blk-bg">
                <div className="side-header">Alcohol Support Options:</div>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Hotlines and Text Support:</strong></p>
                <p><strong>National Helpline for Substance Abuse:</strong> 1-800-662-HELP (4357) provides free, confidential, 24/7 support for individuals struggling with substance abuse​ (SAMHSA)​.</p>
                <p><strong>Text “HELLO” to 741741:</strong> Connects you to a trained counselor for assistance with stress or alcohol-related issues​ (Crisis Text Line)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Smartphone Apps:</strong></p>
                <p><strong>AlcoDroid:</strong> An app that tracks alcohol consumption and helps you stay within safe drinking limits​ (AlcoDroid)​.</p>
                <p><strong>Rethinking Drinking:</strong> A CDC app that provides resources and tools to help you assess and reduce alcohol consumption​ (CDC)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Online Resources:</strong></p>
                <p><strong>Alcohol.org:</strong> Offers resources for managing alcohol addiction, with access to support groups, treatment options, and more​ (Alcohol.org)​.</p>
                <p><strong>VA’s Alcohol and Drug Use Resources:</strong> Provides a range of resources for service members and veterans dealing with alcohol abuse​ (VA.gov)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Counseling and Support Groups:</strong></p>
                <p>Many local military bases provide counseling and Alcoholics Anonymous (AA) meetings, specifically for military personnel dealing with alcohol issues​ (VA.gov)​.</p>
              </div>
            </div>

          </Grid>
        </Grid>
      ),
    },
    {
      title: (
        <>
          <div className="survey-response-accordion">
            <div className="title">Work Experience</div>
            <ProgressBar value={recruit.recruit.overall_wellness.work_experience}></ProgressBar>
          </div>
        </>
      ),
      content: (
        <Grid row gap>
          <Grid className="survey-response-main" col={8}>
            <div className="section">
              <p className="headline">
                Military service provides unique opportunities for professional development. The skills you acquire can be applied in a wide range of civilian careers.
              </p>
              <p>
                Understanding how your military experience translates into the civilian workforce can help you transition smoothly after service. The military offers various programs that assist with career development and job placement.
              </p>
              <p>
                Taking advantage of these programs can ensure that your military experience leads to successful post-service employment.
              </p>
              <p className="citation">— U.S. Department of Labor</p>
              </div>
              <div className="section blk-bg">
                <div className="header">Career Development Services</div>
                <p>For assistance with career planning and job placement, visit <a href="military-careers.mil">military-careers.mil</a> or call (800) 555-3210 to speak with a career counselor.</p>
              </div>

            <div className="section">
              <div className="header-table">
                Your response(s)
              </div>
              <Table  striped>
                <tbody>
                  {Object.entries(recruit.recruit.survey['Work Experience']).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Grid>
          <Grid className="survey-response-side-content" col={4}>
            <div className="section">
              <div className="blk-bg">
                <div className="side-header">Work Experience Support Options:</div>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Job Search Hotlines:</strong></p>
                <p><strong>Veterans Employment Center:</strong> A service that connects veterans and service members with job opportunities and career counseling​ (Veterans.gov)​.</p>
                <p><strong>Hiring Our Heroes:</strong> A nationwide initiative that helps military members and veterans find jobs through job fairs and networking opportunities​ (Hiring Our Heroes)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Smartphone Apps:</strong></p>
                <p><strong>LinkedIn:</strong> A professional networking app that connects job seekers with potential employers, including military-specific resources​ (LinkedIn)​.</p>
                <p><strong>JobScan:</strong> An app designed to help veterans tailor their resumes to civilian job descriptions​ (JobScan)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Online Resources:</strong></p>
                <p><strong>US Department of Labor Veterans’ Employment Program:</strong> Offers resources and programs to help veterans transition into the civilian workforce​ (DOL)​.</p>
                <p><strong>GI Bill Benefits:</strong> Allows veterans to use their military service benefits for educational purposes, including job training programs​ (VA.gov)​.</p>
              </div>
              <div className="section">
                <p className="paragraph-heading"><strong>Career Counseling and Support Groups:</strong></p>
                <p>Many military bases offer career counseling and job placement services, as well as workshops to improve resume writing and interview skills​ (Military.com)​.</p>
              </div>
            </div>

          </Grid>
        </Grid>
      ),
    },
  ];

  return (
    <div className="survey-response-details">
      <div className="survey-header-container">
        <h2>Survey Response Details</h2>
        <div className="wellness-rating-legend">
          <span >Wellness Rating Legend: </span> 
          <span className="positive-chip chip">No Concern</span>
          <span className="medium-chip chip">Moderate Concern</span>
          <span className="warning-chip chip">High Concern</span>
        </div>
        <div className="tab-links">
          <Button type="button">Recruit</Button>
          <Button type="button" disabled>2025</Button>
        </div>
      </div>
      <Accordion items={accordionItems}></Accordion>

    </div>
  );
};

export default SurveyResponse;