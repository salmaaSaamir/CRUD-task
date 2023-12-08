import { gql } from '@apollo/client';
export const GET_REQPHASE = gql`
  {
    getReqPhase{
      id,
      intro,
      propuse,
      audiance,
      description,
      feature,
      file,
      fileName,
      phaseName
    }
  }
`;
export const GET_DESIGNPHASE= gql`
  {
    getDesignPhase{
      id,
      file,
      fileName,
      phaseName
    }
  }
`;
export const GET_INITPHASE = gql`
  {
    getInitPhase{
      id,
      projectTitle,
      startDate,
      endDate,
      manager,
      budget,
      scopeStatment
    }
  }
`;
export const GET_FILES = gql`
  {
    getFiles{
      id,
      phaseName,
      fileName,
      file
    }
  }
`;
export const GETTOEDIT_INITPHASE = gql`
  query ($id: Int){
    getSpecificInitPhase(id: $id) {
      id,
      projectTitle,
      startDate,
      endDate,
      manager,
      budget,
      scopeStatment
    }
  }
`;
export const GETTOEDIT_DESIGNPHASE = gql`
  query ($id: Int){
    getSpecificDesignPhase(id: $id) {
      id,
      phaseName,
      fileName,
      file
    }
  }
`;
export const GETTOEDIT_REQPHASE = gql`
  query ($id: Int){
    getSpecificReqPhase(id: $id) {
      id,
      intro,
      propuse,
      audiance,
      description,
      feature,
      file,
      fileName,
      phaseName
    }
  }
`;

export const ADD_File = gql`
  mutation($fileName: String, $file: String, $phaseName: String) {
    createDesignPhase(fileName: $fileName, file: $file, phaseName: $phaseName)
  }
`;
export const ADD_INITPHASE = gql`
  mutation($projectTitle: String, $startDate: Date, $endDate: Date, $manager: String, $budget: String, $scopeStatment: String) {
    createInitPhase(projectTitle: $projectTitle, startDate: $startDate, endDate: $endDate, manager: $manager, budget: $budget, scopeStatment: $scopeStatment)
  }
`;
export const ADD_REQPHASE = gql`
  mutation($intro: String, $propuse: String, $audiance: String, $description: String, $feature: String,$file:String,$fileName:String,$phaseName:String) {
    createReqPhase(intro: $intro, propuse: $propuse, audiance: $audiance, description: $description, feature: $feature,file:$file,fileName:$fileName,phaseName:$phaseName)
  }
`;
export const EDIT_DESIGNPHASE = gql`
  mutation($id: Int, $fileName: String, $file: String, $phaseName: String) {
    updateDesinPhase(id: $id, fileName: $fileName, file: $file, phaseName: $phaseName)
  }
`;
export const UPDATE_INITPHASE = gql`
  mutation($id: Int,$projectTitle: String, $startDate: Date, $endDate: Date, $manager: String, $budget: String, $scopeStatment: String) {
    updateInitPhase(id: $id, projectTitle: $projectTitle, startDate: $startDate, endDate: $endDate, manager: $manager, budget: $budget, scopeStatment: $scopeStatment)
  }
`;
export const UPDATE_REQPHASE = gql`
  mutation($id: Int,$intro: String, $propuse: String, $audiance: String, $description: String, $feature: String, $file: String,$fileName:String,$phaseName:String) {
    updateReqPhase(id: $id , intro: $intro, propuse: $propuse, audiance: $audiance, description: $description, feature: $feature,file:$file,fileName:$fileName,phaseName:$phaseName)
  }
`;


export const DELETE_USER = gql`
  mutation($id: Int) {
    deleteUser(id: $id)
  }
  
`;
export const DELETE_DESIGNPHASE = gql`
  mutation($id: Int) {
    deleteDesignPhase(id: $id)
  }
  
`;
export const DELETE_REQPHASE = gql`
  mutation($id: Int) {
    deleteReqPhase(id: $id)
  }
`;
export const DELETE_INITPHASE = gql`
  mutation($id: Int) {
    deleteInitPhase(id: $id)
  }
  
`;
