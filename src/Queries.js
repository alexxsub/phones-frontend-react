import { gql } from "@apollo/client";

//Crud
export const CREATE_PHONE = gql`
  mutation createPhone($input: inputPhone!) {
    createPhone(input: $input) {
      id
      number
      name
    }
  }
`;

//cRud
export const READ_PHONES = gql`
  query readPhones {
    readPhones {
      id
      number
      name
    }
  }
`;

//crUd
export const UPDATE_PHONE = gql`
  mutation updatePhone($input: inputPhone!) {
    updatePhone(input: $input) {
      id
      number
      name
    }
  }
`;
//cruD
export const DELETE_PHONE = gql`
  mutation deletePhone($id: String!) {
    deletePhone(id: $id) {
      id
      number
      name
    }
  }
`;
