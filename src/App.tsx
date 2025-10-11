import Home from "./pages/Dashboard/Home";
import AppLayout from "./layout/AppLayout";
import CvPage from "./pages/cvPage/CvPage";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import UserProfiles from "./pages/UserProfiles";
import NotFound from "./pages/OtherPage/NotFound";
import MyUrlsPage from "./pages/MyUrlsPage/MyUrlsPage";
import CvViewPage from "./pages/CvViewPage/CvViewPage";
import MyWorksPage from "./pages/MyWorksPage/MyWorksPage";
import { ScrollToTop } from "./components/common/ScrollToTop";
import NewScopusPage from "./pages/NewScopusPage/NewScopusPage";
import MyArticlesPage from "./pages/MyArticlesPage/MyArticlesPage";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import ResearchersPage from "./pages/ResearchersPage/ResearchersPage";
import ValidateSignUpPage from "./pages/AuthPages/ValidateSignUpPage";
import MyEducationsPage from "./pages/MyEducationsPage/MyEducationsPage";
import ResearchAreasPage from "./pages/ResearchAreaPage/ResearchAreaPage";
import MyPublicationsPage from "./pages/MyPulbicationsPage/MyPublicationsPage";
import NewWorkDetailsPage from "./pages/NewWorkDetailsPage/NewWorkDetailsPage";
import UserCredentialsPage from "./pages/UserCredentialsPage/UserCredentialsPage";
import LanguageDetailsPage from "./pages/LanguageDetailsPage/LanguageDetailsPage";
import ResearcherDetailsPage from "./pages/ResearcherDetailsPage/ResearcherDetailsPage";
import NewScientificDetailsPage from "./pages/NewScientficDetailsPage/NewScientificDetailsPage";
import ResearcherDetailsAreasPage from "./pages/ResearcherDetailsAreasPage/ResearcherDetailsAreasPage";
import ResearcherDetailsEducation from "./components/ResearcherDetailsEducation/ResearcherDetailsEducation";
import ResearcherDetailsContactPage from "./pages/ResearcherDetailsContactPage/ResearcherDetailsContactPage";
import ResearcherDetailsExperiencePage from "./pages/ResearcherDetailsExperiencePage/ResearcherDetailsExperiencePage";
// import MyInternationalCoorperationsPage from "./pages/MyInternationalCoorperationsPage/MyInternationalCoorperationsPage";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/home" element={<Home />} />

            <Route index path="/user-credentials" element={<UserCredentialsPage />} />

            {/* Profile */}
            <Route index path="/profile" element={<UserProfiles />} />

            {/* Scientific details */}
            <Route path="/new-scientific-details" element={<NewScientificDetailsPage />} />

            {/* Work details */}
            <Route path="/new-work-details" element={<NewWorkDetailsPage />} />

            {/* Education Details */}
            <Route path="/my-educations" element={<MyEducationsPage />} />

            {/* Articles */}
            <Route path="/my-articles" element={<MyArticlesPage />} />

            {/* Scopus */}
            <Route path="/new-scopus" element={<NewScopusPage />} />

            {/* Publications */}
            <Route path="/my-publications" element={<MyPublicationsPage />} />

            {/* international coorperations */}
            {/* <Route path="/my-international-coorperations" element={<MyInternationalCoorperationsPage />} /> */}

            {/* Researchers */}
            <Route path="/research-areas" element={<ResearchAreasPage />} />

            {/* Language details */}
            <Route path="/language-details" element={<LanguageDetailsPage />} />

            {/* Works */}
            <Route path="/my-work-places" element={<MyWorksPage />} />

            {/* Urls */}
            <Route path="/my-urls" element={<MyUrlsPage />} />

            {/* Cv */}
            <Route path="/cv" element={<CvPage />} />
            <Route path="/cv-view" element={<CvViewPage />} />

          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-signup" element={<ValidateSignUpPage />} />

          {/* Public Layout */}
          <Route path="/" element={<ResearchersPage />} />
          <Route path="/researcher-details" element={<ResearcherDetailsPage />} />
          <Route path="/researcher-details/education" element={<ResearcherDetailsEducation />} />
          <Route path="/researcher-details/areas" element={<ResearcherDetailsAreasPage />} />
          <Route path="/researcher-details/experience" element={<ResearcherDetailsExperiencePage />} />
          <Route path="/researcher-details/contact" element={<ResearcherDetailsContactPage />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
