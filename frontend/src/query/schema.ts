import { gql } from "@/__generated__";

export const BlogTest = gql(`
query Blogs {
  blogs {
    data {
      id
      attributes {
        Content
      }
    }
  }
}
`);
