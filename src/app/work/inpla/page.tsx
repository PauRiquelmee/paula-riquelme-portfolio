import CaseStudyPage from '@/components/patterns/case-study-page';
import { getCaseStudyProject } from '@/content/portfolio';
import { getProjectMetadata } from '@/lib/metadata';

const project = getCaseStudyProject('inpla');

export const metadata = getProjectMetadata(project);

const InplaCaseStudyPage = () => <CaseStudyPage project={project} />;

export default InplaCaseStudyPage;
