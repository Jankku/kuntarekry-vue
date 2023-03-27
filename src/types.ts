export type JobAdvertisement = {
  jobAdvertisement: {
    language: string;
    changetime: string;
    publishingOrganization: string;
    publicationStarts: string;
    publicationEnds: string;
    type: string;
    anonymous: string;
    id: string;
    title: string;
    organization: string;
    organizationDesc: string;
    profitCenter: string;
    jobDesc: string;
    salary: string;
    jobDuration: string;
    employment: string;
    employmentId: string;
    contacts: string;
    employmentType: string;
    employmentTypeId: string;
    taskArea: string;
    location: string;
    region: string;
    lightContactInUse: string;
    lightContactRecipients: string;
  };
  publication: {
    url: string;
    visibility: string;
  };
  link: {
    url: string;
  };
};
