import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
const Paginate = ({
  pages,
  page,
  isProblemProfile = false,
  keyword = "",
  isProfileGroup = false,
}) => {
  const { user } = useSelector((state) => state.auth);
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              isProblemProfile
                ? `/profile/${user.userName}/problems/page/${x + 1}`
                : isProfileGroup
                ? `/profile/${user.userName}/groups/page/${x + 1}`
                : `/groups/page/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
