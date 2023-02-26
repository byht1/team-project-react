import { Navigate, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { SharedLayout } from 'page/SharedLayout';
import { NewsPage } from 'page/NewsPage';
import { OurFriendsPage } from 'page/OurFriendsPage';
import { RegisterPage } from 'page/RegisterPage';
import { UserPage } from 'page/UserPage';
import { NoticesPage } from 'page/NoticesPage';
import { NoticesCategoriesList } from 'components/modules/Notices/NoticesCategoriesList';
import { Home } from 'page/Home';

import { Blog } from 'page/Blog';
import { PostDetails } from 'page/PostDetails';

import { LoginPage } from 'page/LoginPage';
import { googleIn, refresh } from 'api/auth';

import { RestrictedRoute } from 'components/global/RestrictedRoute';
import { PrivateRoute } from 'components/global/PrivateRoute';
import { register } from 'redux/auth';
import { Loader } from 'components/global/Loader';

// import { NotFound } from 'page/NotFound';
import { AddMyPetForm } from 'components/modules/ModalAddsPet/Form/AddMyPetForm';
import { FirstPage } from 'components/modules/ModalAddsPet/FormPages/FirstPage';
import { SecondPage } from 'components/modules/ModalAddsPet/FormPages/SecondPage';
import { useAppLoading } from 'hooks/useAppLoading';

function App() {
  const { isLoading } = useAppLoading();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="notices" element={<NoticesPage />}>
          <Route path="sell" element={<NoticesCategoriesList />} />
          <Route path="for-free" element={<NoticesCategoriesList />} />
          <Route path="lost-found" element={<NoticesCategoriesList />} />
          <Route path="favorite" element={<NoticesCategoriesList />} />
          <Route path="own" element={<NoticesCategoriesList />} />
        </Route>
        <Route path="friends" element={<OurFriendsPage />} />
        {/* Публічний шлях */}
        <Route
          path="register"
          element={<RestrictedRoute component={RegisterPage} redirectTo="/user" />}
        />
        <Route
          path="login"
          element={<RestrictedRoute component={LoginPage} redirectTo="/user" />}
        />
        {/* Приватний шлях */}
        <Route path="user" element={<PrivateRoute component={UserPage} redirectTo="/login" />}>
          <Route path="addmypet" element={<AddMyPetForm />}>
            <Route path="page1" element={<FirstPage />} />
            <Route path="page2" element={<SecondPage />} />
          </Route>
        </Route>

        <Route path="posts" element={<Blog />} />
        <Route path="posts/:id" element={<PostDetails />} />

        <Route path="*" element={<Navigate to="/" />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
