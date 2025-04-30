
export function getTooltipText(agentName: string): string {
  switch (agentName.toLowerCase()) {
    case 'miles':
      return 'Your AI Practice Manager handling scheduling & communication';
    case 'giselle':
      return 'Your AI Growth Specialist focused on leads & growth';
    case 'devon':
      return 'Your AI Treatment Closer boosting case acceptance';
    case 'alma':
      return 'Your AI Academy Director for training & onboarding';
    default:
      return '';
  }
}
