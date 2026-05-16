import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Film, 
  Moon, 
  Sun, 
  ChevronDown,
  Menu,
  Image as ImageIcon,
  Video,
  FileText,
  Music,
  Repeat,
  Wand2,
  FileDigit,
  Type,
  FileSpreadsheet,
  Eraser,
  Edit,
  Sparkles
} from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

	// Hover intent timers to prevent flicker
	const toolsOpenTimer = useRef<number | undefined>(undefined);
	const toolsCloseTimer = useRef<number | undefined>(undefined);
	const companyOpenTimer = useRef<number | undefined>(undefined);
	const companyCloseTimer = useRef<number | undefined>(undefined);

	const scheduleOpen = (
		setter: React.Dispatch<React.SetStateAction<boolean>>,
		openTimerRef: React.MutableRefObject<number | undefined>,
		closeTimerRef: React.MutableRefObject<number | undefined>,
		delay = 80
	) => {
		if (closeTimerRef.current) {
			window.clearTimeout(closeTimerRef.current);
			closeTimerRef.current = undefined;
		}
		if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
		openTimerRef.current = window.setTimeout(() => setter(true), delay);
	};

	const scheduleClose = (
		setter: React.Dispatch<React.SetStateAction<boolean>>,
		openTimerRef: React.MutableRefObject<number | undefined>,
		closeTimerRef: React.MutableRefObject<number | undefined>,
		delay = 150
	) => {
		if (openTimerRef.current) {
			window.clearTimeout(openTimerRef.current);
			openTimerRef.current = undefined;
		}
		if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
		closeTimerRef.current = window.setTimeout(() => setter(false), delay);
	};
  
  const toolsDropdownRef = useRef<HTMLDivElement>(null);
  const companyDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(event.target as Node)) {
        setIsToolsDropdownOpen(false);
      }
      if (companyDropdownRef.current && !companyDropdownRef.current.contains(event.target as Node)) {
        setIsCompanyDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <Film size={24} />
          </span>
          <span className={styles.logoText}>ConvertFlix</span>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <Link to="/" className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}>
            Home
          </Link>
          
			{/* Tools Dropdown */}
			<div
				className={styles.dropdown}
				ref={toolsDropdownRef}
				onMouseEnter={() => scheduleOpen(setIsToolsDropdownOpen, toolsOpenTimer, toolsCloseTimer)}
				onMouseLeave={() => scheduleClose(setIsToolsDropdownOpen, toolsOpenTimer, toolsCloseTimer)}
			>
            <button
              className={`${styles.dropdownToggle} ${isToolsDropdownOpen ? styles.active : ''}`}
					onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
            >
              Tools
              <span className={styles.dropdownArrow}>
                <ChevronDown size={16} />
              </span>
            </button>
            {isToolsDropdownOpen && (
					<div
						className={`${styles.dropdownMenu} ${styles.mega}`}
						onMouseEnter={() => scheduleOpen(setIsToolsDropdownOpen, toolsOpenTimer, toolsCloseTimer)}
						onMouseLeave={() => scheduleClose(setIsToolsDropdownOpen, toolsOpenTimer, toolsCloseTimer)}
					>
                <div className={styles.dropdownGrid}>
                  <div className={styles.dropdownSection}>
                    <h4>Image Tools</h4>
                    <div className={styles.megaLinksGroup}>
                      <Link to="/tools/compress-image" className={styles.megaLink}>
                        <div className={styles.iconBox}><ImageIcon size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>Compress Image</span>
                          <span className={styles.linkDesc}>Reduce file size</span>
                        </div>
                      </Link>
                      <Link to="/tools/png-to-jpg" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>PNG to JPG</span>
                          <span className={styles.linkDesc}>Convert formats</span>
                        </div>
                      </Link>
                      <Link to="/tools/jpg-to-png" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>JPG to PNG</span>
                          <span className={styles.linkDesc}>Preserve transparency</span>
                        </div>
                      </Link>
                      <Link to="/tools/webp-to-jpg" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>WEBP to JPG</span>
                          <span className={styles.linkDesc}>Enhance compatibility</span>
                        </div>
                      </Link>
                      <Link to="/tools/svg-to-png" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>SVG to PNG</span>
                          <span className={styles.linkDesc}>Vector to raster</span>
                        </div>
                      </Link>
                      <Link to="/tools/png-to-svg" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>PNG to SVG</span>
                          <span className={styles.linkDesc}>Raster to vector</span>
                        </div>
                      </Link>
                      <Link to="/tools/jpg-to-webp" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>JPG to WEBP</span>
                          <span className={styles.linkDesc}>Modern compression</span>
                        </div>
                      </Link>
                      <Link to="/tools/webp-to-png" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>WEBP to PNG</span>
                          <span className={styles.linkDesc}>Standardize web images</span>
                        </div>
                      </Link>
                      <Link to="/tools/png-to-webp" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>PNG to WEBP</span>
                          <span className={styles.linkDesc}>Optimize transparency</span>
                        </div>
                      </Link>
                      <Link to="/tools/enhance-image" className={styles.megaLink}>
                        <div className={styles.iconBox}><Wand2 size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>AI Enhancer</span>
                          <span className={styles.linkDesc}>Upscale & improve</span>
                        </div>
                      </Link>
                      <Link to="/tools/remove-background" className={styles.megaLink}>
                        <div className={styles.iconBox}><Eraser size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>Remove Background</span>
                          <span className={styles.linkDesc}>Transparent in seconds</span>
                        </div>
                      </Link>
                      <Link to="/tools/image-editor" className={styles.megaLink}>
                        <div className={styles.iconBox}><Edit size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>Image Editor</span>
                          <span className={styles.linkDesc}>Crop, resize & tune</span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className={styles.dropdownSection}>
                    <h4>Video Tools</h4>
                    <div className={styles.megaLinksGroup}>
                      <Link to="/tools/compress-video" className={styles.megaLink}>
                        <div className={styles.iconBox}><Video size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>Compress Video</span>
                          <span className={styles.linkDesc}>Optimize for web</span>
                        </div>
                      </Link>
                      <Link to="/tools/mov-to-mp4" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>MOV to MP4</span>
                          <span className={styles.linkDesc}>Apple to standard</span>
                        </div>
                      </Link>
                      <Link to="/tools/mp4-to-gif" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>MP4 to GIF</span>
                          <span className={styles.linkDesc}>Create animations</span>
                        </div>
                      </Link>
                      <Link to="/tools/mkv-to-mp4" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>MKV to MP4</span>
                          <span className={styles.linkDesc}>Convert formats</span>
                        </div>
                      </Link>
                      <Link to="/tools/avi-to-mp4" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>AVI to MP4</span>
                          <span className={styles.linkDesc}>Convert legacy</span>
                        </div>
                      </Link>
                      <Link to="/tools/webm-to-mp4" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>WEBM to MP4</span>
                          <span className={styles.linkDesc}>Web video to standard</span>
                        </div>
                      </Link>
                      <Link to="/tools/mp4-to-webm" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>MP4 to WEBM</span>
                          <span className={styles.linkDesc}>Optimize for browser</span>
                        </div>
                      </Link>
                      <Link to="/tools/flv-to-mp4" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>FLV to MP4</span>
                          <span className={styles.linkDesc}>Flash to standard</span>
                        </div>
                      </Link>
                      <Link to="/tools/enhance-video" className={styles.megaLink}>
                        <div className={styles.iconBox}><Sparkles size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>Video Enhancer</span>
                          <span className={styles.linkDesc}>Improve resolution</span>
                        </div>
                      </Link>
                      <Link to="/tools/video-editor" className={styles.megaLink}>
                        <div className={styles.iconBox}><Edit size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>Video Editor</span>
                          <span className={styles.linkDesc}>Trim, merge & add effects</span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className={styles.dropdownSection}>
                    <h4>Audio Tools</h4>
                    <div className={styles.megaLinksGroup}>
                      <Link to="/tools/compress-audio" className={styles.megaLink}>
                        <div className={styles.iconBox}><Music size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>Compress Audio</span>
                          <span className={styles.linkDesc}>Lower bitrate</span>
                        </div>
                      </Link>
                      <Link to="/tools/mp4-to-mp3" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>MP4 to MP3</span>
                          <span className={styles.linkDesc}>Extract audio</span>
                        </div>
                      </Link>
                      <Link to="/tools/wav-to-mp3" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>WAV to MP3</span>
                          <span className={styles.linkDesc}>Compress lossless</span>
                        </div>
                      </Link>
                      <Link to="/tools/m4a-to-mp3" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>M4A to MP3</span>
                          <span className={styles.linkDesc}>Convert Apple audio</span>
                        </div>
                      </Link>
                      <Link to="/tools/flac-to-mp3" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>FLAC to MP3</span>
                          <span className={styles.linkDesc}>Reduce size</span>
                        </div>
                      </Link>
                      <Link to="/tools/mp3-to-wav" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>MP3 to WAV</span>
                          <span className={styles.linkDesc}>Uncompress format</span>
                        </div>
                      </Link>
                      <Link to="/tools/ogg-to-mp3" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>OGG to MP3</span>
                          <span className={styles.linkDesc}>Web audio to standard</span>
                        </div>
                      </Link>
                      <Link to="/tools/aac-to-mp3" className={styles.megaLink}>
                        <div className={styles.iconBox}><Repeat size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>AAC to MP3</span>
                          <span className={styles.linkDesc}>Convert mobile audio</span>
                        </div>
                      </Link>
                      <Link to="/tools/audio-editor" className={styles.megaLink}>
                        <div className={styles.iconBox}><Edit size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>Audio Editor</span>
                          <span className={styles.linkDesc}>Cut, mix & fade</span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className={styles.dropdownSection}>
                    <h4>Document Tools</h4>
                    <div className={styles.megaLinksGroup}>
                      <Link to="/tools/compress-pdf" className={styles.megaLink}>
                        <div className={styles.iconBox}><FileDigit size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>Compress PDF</span>
                          <span className={styles.linkDesc}>Shrink document size</span>
                        </div>
                      </Link>
                      <Link to="/tools/word-to-pdf" className={styles.megaLink}>
                        <div className={styles.iconBox}><Type size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>Word to PDF</span>
                          <span className={styles.linkDesc}>Lock formatting</span>
                        </div>
                      </Link>
                      <Link to="/tools/pdf-to-word" className={styles.megaLink}>
                        <div className={styles.iconBox}><FileText size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>PDF to Word</span>
                          <span className={styles.linkDesc}>Make editable</span>
                        </div>
                      </Link>
                      <Link to="/tools/image-to-pdf" className={styles.megaLink}>
                        <div className={styles.iconBox}><FileDigit size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>Image to PDF</span>
                          <span className={styles.linkDesc}>Convert images to docs</span>
                        </div>
                      </Link>
                      <Link to="/tools/pdf-to-jpg" className={styles.megaLink}>
                        <div className={styles.iconBox}><ImageIcon size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>PDF to JPG</span>
                          <span className={styles.linkDesc}>Extract pages as JPG</span>
                        </div>
                      </Link>
                      <Link to="/tools/pdf-to-png" className={styles.megaLink}>
                        <div className={styles.iconBox}><ImageIcon size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>PDF to PNG</span>
                          <span className={styles.linkDesc}>Extract pages as PNG</span>
                        </div>
                      </Link>
                      <Link to="/tools/excel-to-pdf" className={styles.megaLink}>
                        <div className={styles.iconBox}><FileSpreadsheet size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>Excel to PDF</span>
                          <span className={styles.linkDesc}>Share spreadsheets</span>
                        </div>
                      </Link>
                      <Link to="/tools/pdf-to-excel" className={styles.megaLink}>
                        <div className={styles.iconBox}><FileSpreadsheet size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>PDF to Excel</span>
                          <span className={styles.linkDesc}>Extract tables</span>
                        </div>
                      </Link>
                      <Link to="/tools/ppt-to-pdf" className={styles.megaLink}>
                        <div className={styles.iconBox}><FileText size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>PPT to PDF</span>
                          <span className={styles.linkDesc}>Secure presentations</span>
                        </div>
                      </Link>
                      <Link to="/tools/pdf-to-ppt" className={styles.megaLink}>
                        <div className={styles.iconBox}><FileText size={20} /></div>
                        <div className={styles.linkText}>
                          <span className={styles.linkTitle}>PDF to PPT</span>
                          <span className={styles.linkDesc}>Editable slides</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
					</div>
            )}
          </div>

			{/* Company Dropdown */}
			<div
				className={styles.dropdown}
				ref={companyDropdownRef}
				onMouseEnter={() => scheduleOpen(setIsCompanyDropdownOpen, companyOpenTimer, companyCloseTimer)}
				onMouseLeave={() => scheduleClose(setIsCompanyDropdownOpen, companyOpenTimer, companyCloseTimer)}
			>
            <button
              className={`${styles.dropdownToggle} ${isCompanyDropdownOpen ? styles.active : ''}`}
					onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
            >
              Company
              <span className={styles.dropdownArrow}>
                <ChevronDown size={16} />
              </span>
            </button>
            {isCompanyDropdownOpen && (
					<div
						className={styles.dropdownMenu}
						onMouseEnter={() => scheduleOpen(setIsCompanyDropdownOpen, companyOpenTimer, companyCloseTimer)}
						onMouseLeave={() => scheduleClose(setIsCompanyDropdownOpen, companyOpenTimer, companyCloseTimer)}
					>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/owner">Owner</Link>
					</div>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className={styles.rightSection}>
          {/* Theme Toggle */}
          <button className={styles.themeToggle} onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Auth Section */}
          {user ? (
            <div className={styles.profileDropdown} ref={profileDropdownRef}>
              <button
                className={styles.profileButton}
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <img src={user.avatar} alt={user.email} className={styles.avatar} />
                <span className={styles.userName}>{user.fullName}</span>
                <span className={styles.dropdownArrow}>
                  <ChevronDown size={16} />
                </span>
              </button>
              {isProfileDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link to="/profile">Profile</Link>
                  <Link to="/settings">Settings</Link>
                  <button onClick={handleLogout} className={styles.logoutButton}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login" className={styles.loginButton}>Login</Link>
              <Link to="/signup" className={styles.signupButton}>Sign Up</Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/" className={styles.mobileNavLink}>Home</Link>
          
          <div className={styles.mobileDropdown}>
            <button className={styles.mobileDropdownToggle}>
              Tools
            </button>
            <div className={styles.mobileDropdownContent}>
              <Link to="/tools/compress-image">Compress Image</Link>
              <Link to="/tools/compress-video">Compress Video</Link>
              <Link to="/tools/compress-pdf">Compress PDF</Link>
              <Link to="/tools/compress-audio">Compress Audio</Link>
              <Link to="/tools/png-to-jpg">PNG to JPG</Link>
              <Link to="/tools/mov-to-mp4">MOV to MP4</Link>
              <Link to="/tools/mp4-to-mp3">MP4 to MP3</Link>
              <Link to="/tools/word-to-pdf">Word to PDF</Link>
              <Link to="/tools/wav-to-mp3">WAV to MP3</Link>
              <Link to="/tools/convert-image">Convert Image</Link>
              <Link to="/tools/convert-video">Convert Video</Link>
              <Link to="/tools/convert-pdf">Convert PDF</Link>
              <Link to="/tools/convert-audio">Convert Audio</Link>
              <Link to="/tools/enhance-image">AI Image Enhancer</Link>
            </div>
          </div>

          <div className={styles.mobileDropdown}>
            <button className={styles.mobileDropdownToggle}>
              Company
            </button>
            <div className={styles.mobileDropdownContent}>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/owner">Owner</Link>
            </div>
          </div>

          {!user && (
            <>
              <Link to="/login" className={styles.mobileAuthButton}>Login</Link>
              <Link to="/signup" className={styles.mobileAuthButton}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
