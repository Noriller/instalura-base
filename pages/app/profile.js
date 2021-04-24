import React from 'react';
import PropTypes from 'prop-types';
import { authService } from '../../src/services/auth/authService';
import { userService } from '../../src/services/user/userService';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';
import { Box } from '../../src/components/foundation/layout/Box';
import Text from '../../src/components/foundation/Text';

function ProfilePage(props) {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(props, null, 2));

  return (
    <Box
      backgroundColor="#F2F2F2"
      height="100%"
      width="100%"
    >
      <Box
        width={{
          md: '40%',
        }}
        margin={{
          xs: '5%',
          md: '5% 30% 0 30%',
        }}
        display="flex"
        flexDirection="row"
        flexWrap={{
          xs: 'wrap',
          md: 'nowrap',
        }}
      >
        <ProfileMainImage />
        <Box
          heigth="auto"
          width={{
            xs: '70%',
            md: '-webkit-fill-available',
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          width={{
            xs: '70%',
            md: '-moz-available',
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          width={{
            xs: '70%',
            md: 'fill-available',
          }}
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
        >
          <ProfileHeaderData />
          <ProfileNameDescription />
        </Box>
        <ProfileNameDescription mobile />
      </Box>
    </Box>
  );
}

export default websitePageHOC(ProfilePage, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Profile',
    },
    menuProps: {
      display: true,
      logged: true,
    },
    pageBoxProps: {
      backgroundImage: 'url(/images/bubbles.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom right',
    },
  },
});

export async function getServerSideProps(ctx) {
  const auth = authService(ctx);
  const hasActiveSession = await auth.hasActiveSession();

  if (hasActiveSession) {
    const session = await auth.getSession();
    const profilePage = await userService.getProfilePage(ctx);
    return {
      props: {
        user: {
          ...session,
          ...profilePage.user,
        },
        posts: profilePage.posts,
      },
    };
  }

  ctx.res.writeHead(307, { location: '/login' });
  ctx.res.end();

  return {
    props: {},
  };
}

function ProfileMainImage() {
  return (
    <Box
      marginRight={{
        xs: '15%',
        md: '8%',
      }}
      width={{
        xs: '15%',
        md: '15vw',
      }}
      height={{
        xs: '15vh',
        md: '15vw',
      }}
      position="relative"
    >
      <img
        src="https://media.giphy.com/media/bn0zlGb4LOyo8/giphy.gif"
        alt="avatar-big"
        height="100%"
        style={{ borderRadius: '100%' }}
      />
    </Box>
  );
}

function ProfileHeaderData() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
    >
      <Box
        display="flex"
        flexDirection="column"
      >
        <Text
          variant="titleXS"
          as="h3"
          margin="0"
        >
          234
        </Text>
        <Text
          variant="paragraph1"
          as="span"
          margin="0"
        >
          Publicações
        </Text>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
      >
        <Text
          variant="titleXS"
          as="h3"
          margin="0"
        >
          22K
        </Text>
        <Text
          variant="paragraph1"
          as="span"
          margin="0"
        >
          Seguindo
        </Text>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
      >
        <Text
          variant="titleXS"
          as="h3"
          margin="0"
        >
          134K
        </Text>
        <Text
          variant="paragraph1"
          as="span"
          margin="0"
        >
          Seguidores
        </Text>
      </Box>
    </Box>
  );
}

function ProfileNameDescription({ mobile }) {
  return (
    <Box
      display={{
        xs: mobile ? 'block' : 'none',
        md: mobile ? 'none' : 'block',
      }}
      margin={{
        xs: '5% 0',
        md: '0',
      }}
    >
      <Text
        variant="titleXS"
        as="h3"
        margin="0"
      >
        Nicolas Cage
      </Text>
      <Text
        variant="paragraph1"
        as="span"
        margin="0"
      >
        A wholesome person responsible for the best movies ever.
      </Text>
    </Box>
  );
}

ProfileNameDescription.propTypes = {
  mobile: PropTypes.bool,
};

ProfileNameDescription.defaultProps = {
  mobile: false,
};
