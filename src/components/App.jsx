import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

const Login = lazy(() => import("../pages/Login"));
const Blogs = lazy(() => import("../pages/BlogsHome"));
const Home = lazy(() => import("../pages/Home"));
const Articles = lazy(() => import("../pages/Articles"));
const Anxiety = lazy(() => import("../pages/Anxiety"));
const Depression = lazy(() => import("../pages/Depression"));
const Ocd = lazy(() => import("../pages/Ocd"));
const PanicDisorder = lazy(() => import("../pages/PanicDisorder"));
const BipolarArticle = lazy(() => import("../pages/BipolarArticle"));
const Schizophrenia = lazy(() => import("../pages/Schizophrenia"));
const Ptsd = lazy(() => import("../pages/Ptsd"));
const Psychosis = lazy(() => import("../pages/Psychosis"));
const Initiatives = lazy(() => import("../pages/Initiatives"));
const Quiz = lazy(() => import("../pages/Quiz"));
const Relax = lazy(() => import("../pages/Relax"));

const MoodTracker = lazy(() => import("./MoodTracker"));
const DailyJournal = lazy(() => import("./DailyJournal"));
const WellnessTracker = lazy(() => import("./WellnessTracker"));

const About = lazy(() => import("../pages/About"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const SignUp = lazy(() => import("../pages/SignUp"));

const AnxietyQuiz = lazy(() => import("../pages/AnxietyQuiz"));
const DepressionQuiz = lazy(() => import("../pages/DepressionQuiz"));
const OCDQuiz = lazy(() => import("../pages/OcdQuiz"));
const ADHDQuiz = lazy(() => import("../pages/ADHDQuiz"));
const PTSDQuiz = lazy(() => import("../pages/PTSDQuiz"));
const SocialAnxietyQuiz = lazy(() => import("../pages/SocialAnxietyQuiz"));

const SupportGroupsMain = lazy(() =>
  import("../pages/SupportGroupsMain")
);

const App = () => {

  return (
    <AuthProvider>

      <Suspense
        fallback={
          <div
            style={{
              minHeight: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Loading...
          </div>
        }
      >

        <Routes>

          <Route
            path="/"
            element={<Layout />}
          >

            <Route
              index
              element={<Home />}
            />

            <Route
              path="articles"
              element={<Articles />}
            />

            <Route
              path="anxiety"
              element={<Anxiety />}
            />

            <Route
              path="depression"
              element={<Depression />}
            />

            <Route
              path="ocd"
              element={<Ocd />}
            />

            <Route
              path="panicdisorder"
              element={<PanicDisorder />}
            />

            <Route
              path="bipolar-article"
              element={<BipolarArticle />}
            />

            <Route
              path="schizophrenia"
              element={<Schizophrenia />}
            />

            <Route
              path="ptsd"
              element={<Ptsd />}
            />

            <Route
              path="psychosis"
              element={<Psychosis />}
            />

            <Route
              path="initiatives"
              element={<Initiatives />}
            />

            <Route
              path="mood-tracker"
              element={
                <ProtectedRoute>
                  <MoodTracker />
                </ProtectedRoute>
              }
            />

            <Route
              path="daily-journal"
              element={
                <ProtectedRoute>
                  <DailyJournal />
                </ProtectedRoute>
              }
            />

            <Route
              path="wellness-tracker"
              element={
                <ProtectedRoute>
                  <WellnessTracker />
                </ProtectedRoute>
              }
            />

            <Route
              path="support-groups"
              element={
                <ProtectedRoute>
                  <SupportGroupsMain />
                </ProtectedRoute>
              }
            />

            <Route
              path="blogs"
              element={
                <ProtectedRoute>
                  <Blogs />
                </ProtectedRoute>
              }
            />

            <Route
              path="quiz"
              element={
                <ProtectedRoute>
                  <Quiz />
                </ProtectedRoute>
              }
            />

            <Route
              path="anxiety-quiz"
              element={
                <ProtectedRoute>
                  <AnxietyQuiz />
                </ProtectedRoute>
              }
            />

            <Route
              path="depression-quiz"
              element={
                <ProtectedRoute>
                  <DepressionQuiz />
                </ProtectedRoute>
              }
            />

            <Route
              path="ocd-quiz"
              element={
                <ProtectedRoute>
                  <OCDQuiz />
                </ProtectedRoute>
              }
            />

            <Route
              path="adhd-quiz"
              element={
                <ProtectedRoute>
                  <ADHDQuiz />
                </ProtectedRoute>
              }
            />

            <Route
              path="ptsd-quiz"
              element={
                <ProtectedRoute>
                  <PTSDQuiz />
                </ProtectedRoute>
              }
            />

            <Route
              path="social-anxiety-quiz"
              element={
                <ProtectedRoute>
                  <SocialAnxietyQuiz />
                </ProtectedRoute>
              }
            />

            <Route
              path="relax"
              element={
                <ProtectedRoute>
                  <Relax />
                </ProtectedRoute>
              }
            />

            <Route
              path="about"
              element={<About />}
            />

            <Route
              path="contact"
              element={<ContactUs />}
            />

            <Route
              path="sign-up"
              element={<SignUp />}
            />

            <Route
              path="login"
              element={<Login />}
            />

          </Route>

        </Routes>

      </Suspense>

    </AuthProvider>
  );
};

export default App;