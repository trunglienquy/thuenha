import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";
import React from "react";

const FooterSection = () => {
  return (
    <footer className="border-t border-gray-200 py-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4">
            <Link href="/" className="text-xl font-bold" scroll={false}>
              THUÊ NHÀ
            </Link>
          </div>
          <nav className="mb-4">
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-800"
                  scroll={false}
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-800"
                  scroll={false}
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-800"
                  scroll={false}
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gray-800"
                  scroll={false}
                >
                  Điều khoản dịch vụ
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex space-x-4 mb-4">
            <a href="#" aria-label="Facebook" className="hover:text-primary-600">
                <Facebook size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-primary-600">
                <Instagram size={24} />
            </a>
            <a href="#" aria-label="Youtube" className="hover:text-primary-600">
                <Youtube size={24} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-primary-600">
                <Linkedin size={24} />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500 flex justify-center space-x-4">
            <Link href="/privacy">Chính sách bảo mật</Link>
            <Link href="/terms">Điều khoản dịch vụ</Link>
            <Link href="/cookies">Chính sách cookie</Link>
        </div>
        <div className="text-center text-sm text-gray-500 flex justify-center mt-4">
            <span>© 2025 THUÊ NHÀ. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
