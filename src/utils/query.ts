import { gql } from "@apollo/client"


const get_data = (inputValue: string) => {

return gql`
    query {
        search(query:"${inputValue}", first: 20, type:REPOSITORY){
            edges {
                node {
                    ... on Repository {
                        name
                        id
                        homepageUrl
                        stargazerCount
                        url
                        stargazers(first: 1) {
                            nodes {
                                name
                                email
                                avatarUrl
                            }
                        }
                    }
                }
            }
        }
    }
    `
}
export { get_data } 