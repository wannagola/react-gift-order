import type { ReactElement } from 'react';
import styled from '@emotion/styled';
import NavigationBar from '@/components/common/NavigationBar';
import CategorySection from '@/components/home/CategorySection';
import FriendSelectSection from '@/components/home/FriendSelectSection';
import BannerSection from '@/components/home/BannerSection';
import GiftRankingGrid from '@/components/GiftRanking/GiftRankingGrid';
import LoginPage from '@/pages/loginpage';
import MyPage from '@/pages/MyPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null; 

  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContainer>
          <AppInner>
            <NavigationBar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <FriendSelectSection />
                    <CategorySection />
                    <BannerSection />
                    <GiftRankingGrid />
                  </>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/my"
                element={
                  <ProtectedRoute>
                    <MyPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AppInner>
        </AppContainer>
      </Router>
    </AuthProvider>
  );
}

export default App;

const AppContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.gray100};
  min-height: 100vh;
`;

const AppInner = styled.div`
  max-width: 720px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.gray00};
  min-height: 100vh;
`;
