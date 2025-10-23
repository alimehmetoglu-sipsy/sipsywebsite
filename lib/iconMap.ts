import {
  Bot,
  Brain,
  Zap,
  TrendingUp,
  Shield,
  Network,
  Database,
  Sparkles,
  Search,
  Map,
  Code,
  Repeat,
  HelpCircle,
  Workflow,
  Settings,
  Cloud,
  Lock,
  Target,
  Cpu,
  FileText,
  Rocket,
  BarChart,
  GitBranch,
  Globe,
  Layers,
  Package,
  Server,
  Activity,
  CheckCircle,
  Users,
  Cog,
  LineChart,
  PieChart,
  Briefcase,
  Clock,
  Download,
  Upload,
  RefreshCw,
  Terminal,
  Folder,
  File,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  CloudUpload,
  CloudDownload,
  Link,
  Mail,
  MessageSquare,
  Phone,
  Video,
  Camera,
  Image,
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Heart,
  Star,
  Bookmark,
  Flag,
  Tag,
  Hash,
  AtSign,
  DollarSign,
  Percent,
  Plus,
  Minus,
  X,
  Check,
  AlertCircle,
  AlertTriangle,
  Info,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Copy,
  Clipboard,
  Save,
  Filter,
  SortAsc,
  SortDesc,
  Calendar,
  Bell,
  Inbox,
  Send,
  Share2,
  ExternalLink,
  Home,
  Menu,
  MoreVertical,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Wrench,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  // AI & Automation
  Bot,
  Brain,
  Zap,
  Sparkles,
  Cpu,
  Workflow,

  // Data & Analytics
  Database,
  BarChart,
  LineChart,
  PieChart,
  TrendingUp,
  Activity,

  // Development & Code
  Code,
  Terminal,
  GitBranch,
  Package,
  FileText,
  File,
  Folder,
  Wrench,

  // Infrastructure & Systems
  Server,
  Cloud,
  CloudUpload,
  CloudDownload,
  Network,
  Layers,
  Monitor,

  // Security & Compliance
  Shield,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,

  // Business & Strategy
  Target,
  Briefcase,
  Rocket,
  Users,
  Globe,

  // Process & Workflow
  Search,
  Map,
  Repeat,
  RefreshCw,
  Settings,
  Cog,

  // Communication
  Mail,
  MessageSquare,
  Phone,
  Video,
  Send,
  Share2,

  // UI & Navigation
  Home,
  Menu,
  MoreVertical,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Link,

  // Actions
  Plus,
  Minus,
  X,
  Check,
  Edit,
  Trash2,
  Copy,
  Clipboard,
  Save,
  Download,
  Upload,
  Filter,
  SortAsc,
  SortDesc,

  // Status & Notifications
  AlertCircle,
  AlertTriangle,
  Info,
  Bell,
  Inbox,
  Calendar,
  Clock,

  // Media
  Camera,
  Image,
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Mic,
  MicOff,

  // Engagement
  Heart,
  Star,
  Bookmark,
  Flag,
  Tag,
  Hash,
  AtSign,

  // Devices
  Smartphone,
  Tablet,
  Wifi,

  // Finance
  DollarSign,
  Percent,
};

export function getIcon(iconName?: string | { name?: string; iconName?: string } | null): LucideIcon {
  // Handle different input types
  let iconString: string | undefined;

  if (!iconName) {
    return HelpCircle;
  }

  // If iconName is an object (Strapi IconHub format)
  if (typeof iconName === 'object') {
    // Try 'iconName' property first (new Strapi IconHub format)
    if ('iconName' in iconName && iconName.iconName) {
      iconString = iconName.iconName;
    }
    // Fallback to 'name' property (old format)
    else if ('name' in iconName && iconName.name) {
      iconString = iconName.name;
    }
  } else if (typeof iconName === 'string') {
    iconString = iconName;
  }

  // Return default icon if iconString is not valid
  if (!iconString) {
    return HelpCircle;
  }

  // Handle Strapi IconHub format (e.g., "lucide:brain" -> "Brain")
  let normalizedName = iconString;

  if (iconString.includes(':')) {
    // Extract icon name after the colon (e.g., "lucide:brain" -> "brain")
    const parts = iconString.split(':');
    normalizedName = parts[parts.length - 1];
  }

  // Capitalize first letter and handle kebab-case to PascalCase
  // (e.g., "brain" -> "Brain", "arrow-right" -> "ArrowRight")
  normalizedName = normalizedName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  return iconMap[normalizedName] || iconMap[iconString] || HelpCircle;
}
