import React from 'react';
import PropTypes from 'prop-types';
// import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { ExternalLinkAlt } from 'styled-icons/fa-solid/ExternalLinkAlt';

// import { defaultImage, defaultBackgroundImage } from '../constants/collectives';

// import { imagePreview } from '../lib/utils';

import { Flex,Box } from '@rebass/grid';
import Container from './Container';
import { P } from './Text';
import { Link } from '../server/pages';
import StyledLink from './StyledLink';
import { themeGet } from 'styled-system';
// import Currency from './Currency';
const defaultPledgedLogo = '/static/images/default-collective-logo.svg';

const CollectiveLogoContainer = styled(Flex)`
  justify-content: center;
  border-top: 1px solid ${themeGet('colors.black.200')};
`;

const { collective } = this.props;

let website = collective.website;
if (!website && collective.githubHandle) {
  website = `https://github.com/${collective.githubHandle}`;
}

const PledgeCollectiveCard = ({ collective }) => (
  <Container
    bg="white"
    borderRadius="8px"
    border="1px solid rgba(18,19,20,0.2)"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    minHeight="100%"
    overflow="hidden"
  >
    <CollectiveLogoContainer mt={52} >
      <Box mt={-32}>
        <Link route="collective" params={{ slug: collective.slug }}>
          <img src={defaultPledgedLogo} alt="Pledged Collective" radius={8} width="94px" />
        </Link>
      </Box>
    </CollectiveLogoContainer>

    <P fontSize="1.4rem" textAlign="center" fontWeight="bold" mt={3} color="black">
      <Link route="collective" params={{ slug: collective.slug }}>
        {collective.name}
      </Link>
    </P>

    <P fontSize="1.2rem" textAlign="center" p={1}>
      <FormattedMessage id="Pledgecollective.card" defaultMessage="PLEDGED COLLECTIVES" />
    </P>
    <Link route="createCollectivePledge" params={{ slug: collective.slug }} passHref>
      <StyledLink href={website} color="primary.500" fontSize="Caption">
        <ExternalLinkAlt size="1em" /> {website}
      </StyledLink>
    </Link>
    <Link route="createCollectivePledge" params={{ slug: collective.slug }} passHref>
      <StyledLink buttonStyle="primary" mb={4} mx="auto" buttonSize="small" margin-bottom="40px">
        <FormattedMessage id="menu.createPledge" defaultMessage="Make a Pledge" />
      </StyledLink>
    </Link>
    <Link route="claimCollective" params={{ collectiveSlug: collective.slug }} passHref>
      <StyledLink textAlign="center" width={1} buttonSize="small" buttonStyle="standard">
        <FormattedMessage id="pledge.claim" defaultMessage="Claim this collective" />
      </StyledLink>
    </Link>
  </Container>
);

PledgeCollectiveCard.propTypes = {
  backgroundImage: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  LoggedInUser: PropTypes.object,
  collective: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  stats: PropTypes.shape({
    backers: PropTypes.shape({
      organizations: PropTypes.number,
      users: PropTypes.number,
    }),
    balance: PropTypes.number,
    yearlyBudget: PropTypes.number,
  }),
  type: PropTypes.string.isRequired,
};


export default PledgeCollectiveCard;
