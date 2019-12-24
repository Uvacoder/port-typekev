import styled from 'styled-components';

const PostList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;

  & li {
    margin-bottom: 0.5rem;
    & span {
      text-align: left !important;
    }
  }
`;

export default PostList;