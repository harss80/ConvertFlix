import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Loader } from '@mantine/core';
import { publicAPI } from './services/api';

// Lazy load components
const Navbar = lazy(() => import('./components/Navbar/Navbar'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const VisitTracker = lazy(() => import('./components/VisitTracker/VisitTracker'));
const Maintenance = lazy(() => import('./pages/Maintenance/Maintenance'));

// Lazy load pages
const Home = lazy(() => import('./pages/Home/Home'));
const AdminApp = lazy(() => import('./admin/App'));

// Lazy load tool pages
const CompressImage = lazy(() => import('./pages/Tools/CompressImage/CompressImage'));
const CompressVideo = lazy(() => import('./pages/Tools/CompressVideo/CompressVideo'));
const CompressPDF = lazy(() => import('./pages/Tools/CompressPDF/CompressPDF'));
const CompressAudio = lazy(() => import('./pages/Tools/CompressAudio/CompressAudio'));
const ConvertImage = lazy(() => import('./pages/Tools/ConvertImage/ConvertImage'));
const ConvertVideo = lazy(() => import('./pages/Tools/ConvertVideo/ConvertVideo'));
const ConvertPDF = lazy(() => import('./pages/Tools/ConvertPDF/ConvertPDF'));
const ConvertAudio = lazy(() => import('./pages/Tools/ConvertAudio/ConvertAudio'));
const EnhanceImage = lazy(() => import('./pages/Tools/EnhanceImage/EnhanceImage'));
const RemoveBackground = lazy(() => import('./pages/Tools/RemoveBackground/RemoveBackground'));
const ImageEditor = lazy(() => import('./pages/Tools/ImageEditor/ImageEditor'));

// Image Converters
const PngToJpg = lazy(() => import('./pages/Tools/PngToJpg/PngToJpg'));
const JpgToPng = lazy(() => import('./pages/Tools/JpgToPng/JpgToPng'));
const WebpToJpg = lazy(() => import('./pages/Tools/WebpToJpg/WebpToJpg'));
const SvgToPng = lazy(() => import('./pages/Tools/SvgToPng/SvgToPng'));
const JpgToWebp = lazy(() => import('./pages/Tools/JpgToWebp/JpgToWebp'));
const WebpToPng = lazy(() => import('./pages/Tools/WebpToPng/WebpToPng'));
const PngToWebp = lazy(() => import('./pages/Tools/PngToWebp/PngToWebp'));

// Video Converters
const MovToMp4 = lazy(() => import('./pages/Tools/MovToMp4/MovToMp4'));
const Mp4ToGif = lazy(() => import('./pages/Tools/Mp4ToGif/Mp4ToGif'));
const MkvToMp4 = lazy(() => import('./pages/Tools/MkvToMp4/MkvToMp4'));
const AviToMp4 = lazy(() => import('./pages/Tools/AviToMp4/AviToMp4'));
const WebmToMp4 = lazy(() => import('./pages/Tools/WebmToMp4/WebmToMp4'));
const Mp4ToWebm = lazy(() => import('./pages/Tools/Mp4ToWebm/Mp4ToWebm'));
const FlvToMp4 = lazy(() => import('./pages/Tools/FlvToMp4/FlvToMp4'));

// Audio Converters
const Mp4ToMp3 = lazy(() => import('./pages/Tools/Mp4ToMp3/Mp4ToMp3'));
const WavToMp3 = lazy(() => import('./pages/Tools/WavToMp3/WavToMp3'));
const M4aToMp3 = lazy(() => import('./pages/Tools/M4aToMp3/M4aToMp3'));
const FlacToMp3 = lazy(() => import('./pages/Tools/FlacToMp3/FlacToMp3'));
const Mp3ToWav = lazy(() => import('./pages/Tools/Mp3ToWav/Mp3ToWav'));
const OggToMp3 = lazy(() => import('./pages/Tools/OggToMp3/OggToMp3'));
const AacToMp3 = lazy(() => import('./pages/Tools/AacToMp3/AacToMp3'));

// Document Converters
const WordToPdf = lazy(() => import('./pages/Tools/WordToPdf/WordToPdf'));
const ImageToPdf = lazy(() => import('./pages/Tools/ImageToPdf/ImageToPdf'));

// Lazy load company pages
const About = lazy(() => import('./pages/Company/About/About'));
const Contact = lazy(() => import('./pages/Company/Contact/Contact'));
const Owner = lazy(() => import('./pages/Company/Owner/Owner'));
const Terms = lazy(() => import('./pages/Company/Terms/Terms'));
const Privacy = lazy(() => import('./pages/Company/Privacy/Privacy'));

// Loading component
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '60vh' 
  }}>
    <Loader size="xl" variant="dots" />
  </div>
);

// Auth Pages
import Login from './pages/Auth/Login/Login';
import Signup from './pages/Auth/Signup/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';

// Import styles
import './styles/global.css';
import './App.css';

function App() {
  const [maintenance, setMaintenance] = useState(false);
  const [ready, setReady] = useState(true); // Default to true to prevent blank screen on load
  const [siteName, setSiteName] = useState('ConvertFlix');

  useEffect(() => {
    let mounted = true;
    const fetchStatus = async () => {
      try {
        const res = await publicAPI.getStatus();
        if (!mounted) return;
        setMaintenance(!!res.maintenanceMode);
        if (res.siteName) setSiteName(res.siteName);
      } catch (_) {}
      finally {
        if (mounted) setReady(true);
      }
    };
    fetchStatus();
    const t = setInterval(fetchStatus, 10000);
    const onVis = () => {
      if (document.visibilityState === 'visible') fetchStatus();
    };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      mounted = false;
      clearInterval(t);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId="your-google-client-id">
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <VisitTracker />
            <div className="App">
              {!ready ? (
                <div style={{ minHeight: '100vh' }} />
              ) : maintenance ? (
                <Maintenance siteName={siteName} />
              ) : (
                <>
                  <Navbar />
                  <main>
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                        {/* Home */}
                      <Route path="/" element={<Home />} />

                      {/* Tool Pages */}
                      <Route path="/tools/compress-image" element={<CompressImage />} />
                      <Route path="/tools/compress-video" element={<CompressVideo />} />
                      <Route path="/tools/compress-pdf" element={<CompressPDF />} />
                      <Route path="/tools/compress-audio" element={<CompressAudio />} />
                      <Route path="/tools/convert-image" element={<ConvertImage />} />
                      <Route path="/tools/convert-video" element={<ConvertVideo />} />
                      <Route path="/tools/convert-pdf" element={<ConvertPDF />} />
                      <Route path="/tools/convert-audio" element={<ConvertAudio />} />
                      <Route path="/tools/enhance-image" element={<EnhanceImage />} />
                      <Route path="/tools/remove-background" element={<RemoveBackground />} />
                      <Route path="/tools/image-editor" element={<ImageEditor />} />

                      {/* Image Routes */}
                      <Route path="/tools/png-to-jpg" element={<PngToJpg />} />
                      <Route path="/tools/jpg-to-png" element={<JpgToPng />} />
                      <Route path="/tools/webp-to-jpg" element={<WebpToJpg />} />
                      <Route path="/tools/svg-to-png" element={<SvgToPng />} />
                      <Route path="/tools/jpg-to-webp" element={<JpgToWebp />} />
                      <Route path="/tools/webp-to-png" element={<WebpToPng />} />
                      <Route path="/tools/png-to-webp" element={<PngToWebp />} />

                      {/* Video Routes */}
                      <Route path="/tools/mov-to-mp4" element={<MovToMp4 />} />
                      <Route path="/tools/mp4-to-gif" element={<Mp4ToGif />} />
                      <Route path="/tools/mkv-to-mp4" element={<MkvToMp4 />} />
                      <Route path="/tools/avi-to-mp4" element={<AviToMp4 />} />
                      <Route path="/tools/webm-to-mp4" element={<WebmToMp4 />} />
                      <Route path="/tools/mp4-to-webm" element={<Mp4ToWebm />} />
                      <Route path="/tools/flv-to-mp4" element={<FlvToMp4 />} />

                      {/* Audio Routes */}
                      <Route path="/tools/mp4-to-mp3" element={<Mp4ToMp3 />} />
                      <Route path="/tools/wav-to-mp3" element={<WavToMp3 />} />
                      <Route path="/tools/m4a-to-mp3" element={<M4aToMp3 />} />
                      <Route path="/tools/flac-to-mp3" element={<FlacToMp3 />} />
                      <Route path="/tools/mp3-to-wav" element={<Mp3ToWav />} />
                      <Route path="/tools/ogg-to-mp3" element={<OggToMp3 />} />
                      <Route path="/tools/aac-to-mp3" element={<AacToMp3 />} />

                      {/* Document Routes */}
                      <Route path="/tools/word-to-pdf" element={<WordToPdf />} />
                      <Route path="/tools/image-to-pdf" element={<ImageToPdf />} />

                      {/* Company Pages */}
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/owner" element={<Owner />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />

                      {/* Auth Pages */}
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/reset-password" element={<ResetPassword />} />

                      {/* Admin App */}
                      <Route path="/admin/*" element={<AdminApp />} />

                      {/* 404 - Redirect to home for now */}
                      <Route path="*" element={<Home />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <Footer />
                </>
              )}
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
