import { gql } from "@apollo/client";

export const GET_USER_BY_USERNAME = gql`
  query GetUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      id
      email
      username
      naam
      bio
      kvkNumber
      companyName
      companyEmail
      phoneNumber
      profilePicture
      logo
      linkedinUrl
      websiteUrl
      templateStyle
      colorTheme
      isPublished
      address {
        street
        city
        postalCode
        country
      }
      educations {
        id
        institution
        degree
        field
        startDate
        endDate
        description
        diplomaObtained
      }
      certifications {
        id
        name
        issuer
        startDate
        endDate
        description
      }
      workExperiences {
        id
        company
        role
        description
        startDate
        endDate
        current
      }
    }
  }
`;

export const GET_USER_BY_SLUG = gql`
  query GetUserBySlug($slug: String!) {
    getUserBySlug(slug: $slug) {
      id
      email
      username
      naam
      bio
      kvkNumber
      companyName
      companyEmail
      phoneNumber
      profilePicture
      logo
      linkedinUrl
      websiteUrl
      templateStyle
      colorTheme
      isPublished
      address {
        street
        city
        postalCode
        country
      }
      educations {
        id
        institution
        degree
        field
        startDate
        endDate
        description
        diplomaObtained
      }
      certifications {
        id
        name
        issuer
        startDate
        endDate
        description
      }
      workExperiences {
        id
        company
        role
        description
        startDate
        endDate
        current
      }
    }
  }
`;

export const GET_USER_BY_CUSTOM_DOMAIN = gql`
  query GetUserByCustomDomain($domain: String!) {
    getUserByCustomDomain(domain: $domain) {
      id
      email
      username
      naam
      bio
      kvkNumber
      companyName
      companyEmail
      phoneNumber
      profilePicture
      logo
      linkedinUrl
      websiteUrl
      templateStyle
      colorTheme
      customDomain
      isPremium
      isPublished
      address {
        street
        city
        postalCode
        country
      }
      educations {
        id
        institution
        degree
        field
        startDate
        endDate
        description
        diplomaObtained
      }
      certifications {
        id
        name
        issuer
        startDate
        endDate
        description
      }
      workExperiences {
        id
        company
        role
        description
        startDate
        endDate
        current
      }
    }
  }
`;
