import Image from 'next/image';
import Link from 'next/link';
import LightboxGallery from '@/components/LightboxGallery'; 
import Contact from '@/components/Contact'; 
import WhatsAppButton from '@/components/WhatsAppButton';  
import ComponentPhotos from '@/components/Photos'; 


import photoshop from '@/images/tools/photoshop.svg';
import lightroom from '@/images/tools/lightroom.svg';
import captureone from '@/images/tools/captureone.svg';
import premiere from '@/images/tools/premiere.svg';
import finalcut from '@/images/tools/finalcut.svg';
import capcut from '@/images/tools/capcut.svg';
import davinci from '@/images/tools/davinci.svg';
import pixieset from '@/images/tools/pixieset.svg';
import clickup from '@/images/tools/clickup.svg';

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import {
  InstagramIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'

import image9 from '@/images/photos/9.jpg';
import image11 from '@/images/photos/11.jpg';
import image12 from '@/images/photos/12.jpg';
import image13 from '@/images/photos/13.jpg';
import image14 from '@/images/photos/14.jpg';
import image19 from '@/images/photos/19.jpg';
import image21 from '@/images/photos/21.jpg';
import image23 from '@/images/photos/23.jpg';
import image24 from '@/images/photos/24.jpg';
import image25 from '@/images/photos/25.jpg';
import image26 from '@/images/photos/26.jpg';
import image28 from '@/images/photos/28.jpg';
import image29 from '@/images/photos/29.jpg';
import image30 from '@/images/photos/30.jpg';
import image31 from '@/images/photos/31.jpg';
import image33 from '@/images/photos/33.jpg';
import image37 from '@/images/photos/37.jpg';
import image39 from '@/images/photos/39.jpg';
import image40 from '@/images/photos/40.jpg';
import image41 from '@/images/photos/41.jpg';
import image42 from '@/images/photos/42.jpg';
import image43 from '@/images/photos/43.jpg';
import image44 from '@/images/photos/44.jpg';
import image45 from '@/images/photos/45.jpg';
import image46 from '@/images/photos/46.jpg';

import logoBeabstracto from '@/images/logos/beabstracto-logo.svg'
import logoLiu from '@/images/logos/Liu-logo.svg'
import logoCreativePhotographyMunich from '@/images/logos/creative-photography-munich.svg'
import logoAhenkePhotography from '@/images/logos/ahenke-photography.svg'
import logoMichiganState from '@/images/logos/Michigan State University.svg'
import logoNorthwestern from '@/images/logos/Northwestern University.png'
import logoUnifranz from '@/images/logos/Unifranz Bolivia.svg'

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Resume() {
  let resume = [
    {
      company: 'Beabstracto',
      title: 'Photographer and Filmmaker',
      logo: logoBeabstracto,
      start: 'Jul 2023',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'Creative Photography Munich',
      title: 'Community Builder',
      logo: logoCreativePhotographyMunich,
      start: 'Oct 2023',
      end: 'Present',
    },
    {
      company: 'Ahenke Photography',
      title: 'Freelance Photographer',
      logo: logoAhenkePhotography,
      start: 'Jan 2022',
      end: 'Present',
    },
    {
      company: 'Backstage Academy',
      title: 'Freelance Photographer',
      logo: logoLiu,
      start: 'Jan 2022',
      end: {
        label: 'Jul 2023',
      },
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button href="/Pamela_Ahenke_Photography_v2.pdf" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

function Role({ role }) {
  let startLabel = typeof role.start === 'string' ? role.start : role.start.label
  let startDate = typeof role.start === 'string' ? role.start : role.start.dateTime
  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  function getBgColor(company) {
    if (company === 'Beabstracto') {
      return 'bg-[#27272A] dark:bg-[#27272A]'; // Mesma cor no dark e light mode
    } else if (company === 'Backstage Academy') {
      return 'bg-[#FFFFFF] dark:bg-[#FFFFFF]'; // Mesma cor no dark e light mode
    } else {
      return 'bg-zinc-100 dark:bg-zinc-100'; // Padrão
    }
  }
  

  const bgColor = getBgColor(role.company);


  return (
    <li className="flex gap-4">
      <div className={`relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 ${bgColor} dark:bg-zinc-800`}>
        <Image
          src={role.logo}
          alt={`${role.company} logo`}
          width={40}
          height={40}
          loading="lazy"
          className="h-7 w-7"
          unoptimized
        />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  );
}


function Education() {
  let education = [
    {
      institution: 'Michigan State University',
      title: 'Camera, Exposure & Photography',
      logo: logoMichiganState,
      start: 'Aug 2024',
      end: ' ',
      backgroundColor: 'bg-white',  // Fundo branco
    },
    {
      institution: 'Northwestern University',
      title: 'Digital Image and Video Processing',
      logo: logoNorthwestern,
      start: 'Aug 2024',
      end: ' ',
      backgroundColor: 'bg-[#4E2A83]',  // Fundo personalizado (Northwestern)
    },
    {
      institution: 'Unifranz Bolivia',
      title: 'BSc. Marketing & Advertising (not finished)',
      logo: logoUnifranz,
      start: '2019',
      end: '2020',
      backgroundColor: 'bg-white',  // Fundo branco
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Education</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {education.map((edu, eduIndex) => (
          <li key={eduIndex} className="flex gap-4">
            <div className={`relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 ${edu.backgroundColor}`}>
              <Image
                src={edu.logo}
                alt={`${edu.institution} logo`}
                width={40}
                height={40}
                loading="lazy"
                className="h-7 w-7"
                unoptimized
              />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Institution</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {edu.institution}
              </dd>
              <dt className="sr-only">Course</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {edu.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${edu.start} until ${edu.end}`}
              >
                <time dateTime={edu.start}>{edu.start}</time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={edu.end}>{edu.end}</time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Tools() {
  const tools = [
    { name: 'Adobe Photoshop', logo: photoshop },
    { name: 'Adobe Lightroom', logo: lightroom },
    { name: 'Capture One', logo: captureone },
    { name: 'Adobe Premiere', logo: premiere },
    { name: 'Final Cut Pro', logo: finalcut },
    { name: 'CapCut', logo: capcut },
    { name: 'DaVinci Resolve', logo: davinci },
    { name: 'Pixieset', logo: pixieset },
    { name: 'ClickUp', logo: clickup },
  ];

  return (
    <div className="mt-16 sm:mt-20">
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">Tools</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
        {tools.map((tool, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              src={tool.logo}
              alt={`${tool.name} logo`}
              width={60}
              height={60}
              className="object-contain"
            />
            <p className="mt-4 text-sm text-center text-zinc-900 dark:text-zinc-100">{tool.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Home() {
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Photographer and Filmmaker based in Munich.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Pamela Ahenke, a photographer and filmmaker passionate about
            creating stories through the lens. I work as a freelancer and community builder in Munich.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink href="https://www.instagram.com/pam_ahenke/" aria-label="Follow on Instagram" icon={InstagramIcon} />
            <SocialLink href="https://www.linkedin.com/in/pamela-ahenke-0622471a2/" aria-label="Follow on LinkedIn" icon={LinkedInIcon} />
          </div>
        </div>
      </Container>

      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid w-full grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2 lg:gap-x-16">
          <div className="flex flex-col gap-16">
            <Resume />
          </div>
          <div className="flex flex-col gap-16">
            <Education />
          </div>
        </div>
      </Container>

      <Container className="mt-24 md:mt-28">
        <Tools />
      </Container>

      {/* Renderiza apenas o componente Photos */}
      <Container className="mt-24 md:mt-28">
        <ComponentPhotos />
      </Container>

      {/* Botão flutuante do WhatsApp */}
      <WhatsAppButton />
      <Contact />
    </>
  );
}
