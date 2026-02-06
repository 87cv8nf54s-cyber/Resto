import Image from 'next/image';

interface ProfileImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export default function ProfileImage({ src, alt, className = '', sizes }: ProfileImageProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-muted rounded-lg flex items-center justify-center">
        <svg
          className="w-1/2 h-1/2 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        sizes={sizes}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    </div>
  );
}
