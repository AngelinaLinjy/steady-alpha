import { Link, useLocation } from 'react-router-dom';
import { ChatBubbleLeftRightIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Layout, Menu } from 'antd';

export default function Header() {
  const location = useLocation();
  const selectedKey = location.pathname === '/about' ? 'about' : 'ask';

  return (
    <Layout.Sider width={80} theme="dark" style={{ background: 'transparent' }}>
      <div className="flex flex-col h-full items-center text-white">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          theme="dark"
          inlineCollapsed
          items={[
            {
              key: 'ask',
              icon: <ChatBubbleLeftRightIcon className="h-6 w-6" />,
              label: (
                <Link to="/" aria-label="Ask" title="Ask">
                  Ask
                </Link>
              ),
            },
            {
              key: 'about',
              icon: <InformationCircleIcon />,
              label: (
                <Link to="/about" aria-label="About" title="About">
                  About
                </Link>
              ),
            },
          ]}
          className="mt-4 flex-1 w-full"
        />
        <div className="pt-2 text-[10px] text-white/70">
          <p className="m-0">© 2025</p>
        </div>
      </div>
    </Layout.Sider>
  );
}
