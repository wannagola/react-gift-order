import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { FiChevronLeft, FiUser } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';

const NavigationBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, isLoading } = useAuth();

  const handleBack = () => {
    navigate(-1);
  };

  const handleUserIconClick = () => {
    if (isLoading) return;
    if (user) {
      navigate('/my');
    } else {
      navigate('/login');
    }
  };

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <NavBar>
      <Left>
        <IconButton onClick={handleBack}>
          <FiChevronLeft size={24} color={theme.textColors.default} />
        </IconButton>
      </Left>

      <Center>
        <Title onClick={handleTitleClick}>선물하기</Title>
      </Center>

      <Right>
        <IconButton onClick={handleUserIconClick}>
          <FiUser size={24} color={theme.textColors.default} />
        </IconButton>
      </Right>
    </NavBar>
  );
};

export default NavigationBar;

// ---------------------- styled-components ----------------------

const NavBar = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.gray00};
  border-bottom: 1px solid ${({ theme }) => theme.borderColors.default};
  height: 56px;
`;

const Left = styled.div`
  position: absolute;
  left: 16px;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  font: ${({ theme }) => theme.typography.title2Bold};
  color: ${({ theme }) => theme.textColors.default};
`;

const Right = styled.div`
  position: absolute;
  right: 16px;
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  font: ${({ theme }) => theme.typography.title2Bold};
  color: ${({ theme }) => theme.textColors.default};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;
