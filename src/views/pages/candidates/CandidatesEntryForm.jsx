/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../utilities/Form';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// components
import AuthFooter from 'ui-component/cards/AuthFooter';

// api services
import {
  addCandidateExperienceInfoService,
  addCandidateFacilitiesInfoService,
  addCandidateInfoService
} from '../../../services/ApiServices';

// styles
import '../../../styles/utils.css';

export default function EvaluationFormPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [candidate, setCandidate] = useState({});
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [candidateExperienceList, setCandidateExperienceList] = useState([{ experienceField: '', organization: '', years: '' }]);

  const fields = [
    { label: 'INTERVIEW DATE*', name: 'interviewDate', type: 'date' },
    { label: 'FULL NAME*', name: 'fullName', type: 'text' },
    { label: 'NID/BIRTH REGISTRATION*', name: 'nidNumber', type: 'text' },
    { label: 'AGE', name: 'age', type: 'text' },

    { label: 'EMAIL ADDRESS', name: 'email', type: 'text', placeholder: 'example@gmail.com' },
    { label: 'CONTACT NUMBER', name: 'contactNumber', type: 'text' },

    { label: 'PRESENT ADDRESS', name: 'presentAddress', type: 'text' },
    { label: 'PERMANENT ADDRESS', name: 'permanentAddress', type: 'text' },

    { label: 'LAST EDUCATION EXAM', name: 'lastEducationExam', type: 'text' },
    { label: 'LAST EDUCATION SUBJECT', name: 'lastEducationSubject', type: 'text' },
    { label: 'LAST EDUCATION INSTITUTE', name: 'lastEducationInstitute', type: 'text' },
    { label: 'LAST EDUCATION YEAR', name: 'lastEducationYear', type: 'text' },
    { label: 'LAST EDUCATION RESULT', name: 'lastEducationResult', type: 'text' },

    { label: 'FATHER NAME', name: 'fatherName', type: 'text' },
    { label: 'MOTHER NAME', name: 'motherName', type: 'text' },
    // { label: 'NUMBER of SIBLINGS', name: 'numberOfSiblings', type: 'number' },

    // { label: 'Have reference', name: 'haveReference', type: 'checkbox' },
    // { label: 'Reference name', name: 'ReferenceName', type: 'text' },
    // { label: 'Reference relation', name: 'referenceRelation', type: 'text' },
    // { label: 'Reference designation', name: 'referenceDesignation', type: 'text' },

    { label: 'COMPANY', name: 'company', type: 'text', placeholder: 'enter your current company' },
    // { label: 'SBU', name: 'sbu', type: 'text', placeholder: 'enter your current sbu' },
    { label: 'DEPARTMENT', name: 'department', type: 'text', placeholder: 'enter your current department' },
    // { label: 'Reports to', name: 'reportsTo', type: 'text', placeholder: 'enter your current reports to' },
    // { label: 'Designation', name: 'designation', type: 'text', placeholder: 'enter your current designation' },

    { label: 'GROSS SALARY', name: 'salary', type: 'text', placeholder: 'enter your current salary' },
    { label: 'BONUS', name: 'bonus', type: 'text', placeholder: 'enter your current bonus' },
    { label: 'TA/CONVEYANCE', name: 'taOrConveyance', type: 'text', placeholder: 'enter your current TA' },
    { label: 'DA/FOOD', name: 'daOrFood', type: 'text', placeholder: 'enter your current DA' },
    { label: 'MEDICAL/LIFE INSURANCE', name: 'benefitOrAllowance', type: 'text', placeholder: 'enter your current allowance' },
    // { label: 'BENEFIT/ALLOWANCE', name: 'benefitOrAllowance', type: 'text', placeholder: 'enter your current allowance' },

    { label: 'PF/GRATUITY', name: 'pfOrGratuity', type: 'text', placeholder: 'enter your current PF or Gratuity' },
    { label: 'TRANSPORT FACILITY', name: 'transportFacility', type: 'text', placeholder: 'enter your current transport facility' },
    // { label: 'Incentive/KPI', name: 'incentiveOrKpi', type: 'text', placeholder: 'enter your current incentive' },
    { label: 'MOBILE CEILING', name: 'mobileCeiling', type: 'text', placeholder: 'enter your current mobile ceiling' }
    // { label: 'Total CTC', name: 'totalCtc', type: 'text', placeholder: 'enter your current total ctc' },

    // { label: 'Interested to join', name: 'interestedToJoin', type: 'checkbox' },
    // { label: 'bond 2 Years', name: 'bond2Years', type: 'checkbox' },
    // { label: 'Bond 5 years', name: 'bond5Years', type: 'checkbox' },
    // { label: 'Have passport', name: 'havePassport', type: 'checkbox' },
    // { label: 'Have driving license', name: 'haveDrivingLicense', type: 'checkbox' },

    // { label: 'Work anywhere in BD', name: 'workAnywhereInBd', type: 'checkbox' },
    // { label: 'Work at factory', name: 'workAtFactory', type: 'checkbox' },
    // { label: 'Operate computer', name: 'operateComp', type: 'checkbox' },
    // { label: 'Agreed terms', name: 'agreedTerms', type: 'checkbox' },
    // { label: 'Have experiences', name: 'haveExperiences', type: 'checkbox' }
  ];

  const experienceFields = [
    { label: 'Experience field', name: 'experienceField', type: 'text' },
    { label: 'Organization', name: 'organization', type: 'text' },
    { label: 'Years', name: 'years', type: 'text' }
  ];

  const handleSubmit = async (data) => {
    try {
      if (!data.nidNumber || !data.interviewDate || !data.fullName) {
        alert('Interview date, Your name and Your NID are required!');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Format interviewDate to support LocalDateTime object if it exists
      const formattedDate = data.interviewDate ? new Date(data.interviewDate).toISOString() : null;

      const candidateRequestBody = {
        age: data.age ?? '',
        email: data.email ?? '',
        contactNumber: data.contactNumber ?? '',
        nidNumber: data.nidNumber ?? '',
        presentAddress: data.presentAddress ?? '',
        permanentAddress: data.permanentAddress ?? '',
        lastEducationExam: data.lastEducationExam ?? '',
        lastEducationSubject: data.lastEducationSubject ?? '',
        lastEducationInstitute: data.lastEducationInstitute ?? '',
        lastEducationYear: data.lastEducationYear ?? '',
        lastEducationResult: data.lastEducationResult ?? '',
        fatherName: data.fatherName ?? '',
        motherName: data.motherName ?? '',
        numberOfSiblings: data.numberOfSiblings ?? null,
        referenceRelation: data.referenceRelation ?? '',
        referenceDesignation: data.referenceDesignation ?? '',
        haveReference: !!data.haveReference,
        interviewDate: formattedDate,
        interestedToJoin: !!data.interestedToJoin,
        bond2Years: !!data.bond2Years,
        bond5Years: !!data.bond5Years,
        havePassport: !!data.havePassport,
        haveDrivingLicense: !!data.haveDrivingLicense,
        workAnywhereInBd: !!data.workAnywhereInBd,
        workAtFactory: !!data.workAtFactory,
        operateComp: !!data.operateComp,
        agreedTerms: !!data.agreedTerms,
        haveExperiences: data.haveExperiences ?? null,
        experiences: data.experiences ?? [],
        facilitiesInfo: data.facilitiesInfo ?? [],
        evaluationInfo: data.evaluationInfo ?? [],
        fullName: data.fullName ?? '',
        referenceName: data.referenceName ?? ''
      };

      const candidateResponse = await addCandidateInfoService(candidateRequestBody);

      if (candidateResponse?.data?.statusCode === 200) {
        const facilitiesRequestBody = {
          facilityType: 'CURRENT',
          company: data.company ?? '',
          sbu: data.sbu ?? '',
          department: data.department ?? '',
          jobGrade: data.jobGrade ?? '',
          reportsTo: data.reportsTo ?? '',
          jobLocation: data.jobLocation ?? '',
          designation: data.designation ?? '',
          salary: data.salary ?? null,
          bonus: data.bonus ?? '',
          taOrConveyance: data.taOrConveyance ?? '',
          daOrFood: data.daOrFood ?? '',
          benefitOrAllowance: data.benefitOrAllowance ?? '',
          pfOrGratuity: data.pfOrGratuity ?? '',
          transportFacility: data.transportFacility ?? '',
          incentiveOrKpi: data.incentiveOrKpi ?? '',
          mobileCeiling: data.mobileCeiling ?? '',
          totalCtc: data.totalCtc ?? '',
          candidate: candidateResponse.data.data
        };
        await addCandidateFacilitiesInfoService(facilitiesRequestBody);

        setCandidate(candidateResponse.data.data);
        setShowExperienceForm(candidateResponse.data.data.haveExperiences);

        if (!data.haveExperiences) {
          navigate('/candidates/thankyou', { replace: true });
        }
      } else {
        alert('Process failed! Please try again.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      alert('Process failed! Please try again.');
    }
  };

  const handleExperienceChange = (index, name, value) => {
    const updatedRows = [...candidateExperienceList];
    updatedRows[index][name] = value;
    setCandidateExperienceList(updatedRows);
  };

  const handleAddRow = () => {
    setCandidateExperienceList([...candidateExperienceList, { experienceField: '', organization: '', years: '' }]);
  };

  const handleExperienceSubmit = async () => {
    try {
      // Filter out entries with all empty values
      const filteredArray = candidateExperienceList.filter((item) => Object.values(item).some((value) => value !== ''));

      if (!filteredArray.length) {
        alert('Please submit your experiences!');
        return;
      }

      for (let i = 0; i < filteredArray.length; i++) {
        const lineInfo = filteredArray[i];

        const requestBody = {
          experienceField: lineInfo.experienceField || '',
          organization: lineInfo.organization || '',
          years: lineInfo.years || '',
          candidate: candidate
        };

        const response = await addCandidateExperienceInfoService(requestBody);

        if (response?.data?.statusCode !== 200) {
          // Handle individual failure
          alert(`Submission failed for entry ${i + 1}. Please check your data.`);
          return; // Stop further processing
        }
      }

      alert('Thank you for submitting your information!');
      setCandidateExperienceList([{ experienceField: '', organization: '', years: '' }]);
      setShowExperienceForm(false);

      navigate('/candidates/thankyou', { replace: true });
    } catch (err) {
      console.error('Error:', err.message);
      alert('Process failed! Please try again later.');
    }
  };

  const responsiveStyles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      width: '100%',
      maxWidth: '100%',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#fff',
      boxSizing: 'border-box',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    row: { display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' },
    field: {
      flex: '1 1 calc(20% - 12px)',
      minWidth: '200px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      boxSizing: 'border-box'
    },
    label: { fontWeight: 'bold', fontSize: '14px', textAlign: 'left' },
    input: { padding: '10px', width: '100%', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
    button: {
      padding: '15px',
      marginTop: '15px',
      width: '100%',
      backgroundColor: '#5b2c6f',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
      textAlign: 'center'
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#eef2f6' }}>
      <div hidden={showExperienceForm} className="form-max-width center-margin">
        <h2>
          {' '}
          <span style={{ color: 'crimson' }}>Welcome!</span> Please enter your information{' '}
        </h2>
        <Form
          fields={fields}
          initialValues={formData}
          rowsConfig={[8, 5, 2, 10]}
          onSubmit={handleSubmit}
          resetAfterSubmit={true}
          isSeparated={true}
        />
      </div>

      <div hidden={!showExperienceForm}>
        <h2>Please enter your experiences information</h2>

        <button style={responsiveStyles.input} onClick={handleAddRow} className="margin-bottom-1rem">
          <FontAwesomeIcon icon={faPlus} /> Add more
        </button>

        <form style={responsiveStyles.form}>
          <table className="table table-bordered table-striped table-highlight">
            <thead>
              <tr>
                {experienceFields.map((field, fieldIndex) => (
                  <th key={fieldIndex}>{field.label}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {candidateExperienceList.map((experience, experienceIndex) => (
                <tr key={experienceIndex}>
                  {experienceFields.map((field, fieldIndex) => (
                    <td key={fieldIndex}>
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        onChange={(e) => handleExperienceChange(experienceIndex, field.name, e.target.value)}
                        style={{
                          ...responsiveStyles.input
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </form>

        <button style={responsiveStyles.button} onClick={handleExperienceSubmit}>
          Submit
        </button>
      </div>

      <AuthFooter />
    </div>
  );
}
