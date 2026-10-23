import React from 'react';
import { Award, FlaskConical, Palette } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: 'Siddhi Dhokale',
      role: 'Project Lead & Botanical Formulation',
      focus: 'Constituent ratio balance, Aloe vera polysaccharide extraction, physical stability tracking.',
      icon: FlaskConical,
      color: '#00E599',
      initials: 'SD'
    },
    {
      name: 'Vaishnavi Kadam',
      role: 'Dermatological Research & Documentation',
      focus: 'Scientific literature review, TEWL barrier metrics, observation log integrity.',
      icon: Award,
      color: '#FF758F',
      initials: 'VK'
    },
    {
      name: 'Nidhi Chauhan',
      role: 'Creative Direction & Aesthetic Design',
      focus: 'Visual aesthetic identity, packaging concepts, and editorial brand storytelling.',
      icon: Palette,
      color: '#FFD166',
      initials: 'NC'
    }
  ];

  return (
    <section id="team" className="min-h-screen py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#121F17] border border-[#00E599]/40 mb-4 shadow-[0_0_15px_rgba(0,229,153,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E599]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#00E599] font-mono font-medium">
              07 / 07 Project Team
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F3F7F4] leading-tight mb-4">
            Crafted with Care. <br />
            <span className="italic font-light text-[#00E599] drop-shadow-[0_0_20px_rgba(0,229,153,0.35)]">
              Collaborative Science.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#A8BDB0] font-sans leading-relaxed">
            The interdisciplinary team behind the formulation, research synthesis, and aesthetic identity of Rosevera Moisturizer.
          </p>
        </div>

        {/* 3 Team Cards in Dark Neon Styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => {
            const Icon = member.icon;
            return (
              <div
                key={member.name}
                className="p-8 rounded-3xl bg-[#0E1611]/85 border border-[#00E599]/25 shadow-sm hover:border-[#00E599]/60 hover:shadow-[0_0_30px_rgba(0,229,153,0.2)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Portrait Placeholder with Neon Emblem */}
                  <div className="w-24 h-24 rounded-2xl bg-[#121F17] border border-[#00E599]/30 flex flex-col items-center justify-center mb-6 relative overflow-hidden group-hover:border-[#00E599] transition-colors shadow-inner">
                    <span className="font-serif text-3xl font-medium text-[#F3F7F4]">
                      {member.initials}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-[#00E599] font-mono mt-0.5">
                      Verified
                    </span>
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 shadow-[0_0_10px_currentColor]"
                      style={{ backgroundColor: member.color, color: member.color }}
                    />
                  </div>

                  <h3 className="font-serif text-2xl text-[#F3F7F4] mb-1 group-hover:text-[#00E599] transition-colors">
                    {member.name}
                  </h3>

                  <div className="flex items-center space-x-1.5 text-xs text-[#00E599] font-mono uppercase tracking-wider mb-4">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{member.role}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#A8BDB0] leading-relaxed">
                    {member.focus}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#A8BDB0]">
                  <span className="font-mono text-[11px]">Rosevera Project Contributor</span>
                  <div
                    className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                    style={{ backgroundColor: member.color, color: member.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Team Collaboration Note */}
        <div className="mt-12 p-6 rounded-3xl bg-[#121F17] border border-[#00E599]/30 text-center max-w-3xl mx-auto shadow-[0_0_30px_rgba(0,229,153,0.15)]">
          <p className="font-serif text-lg text-[#F3F7F4] mb-2">
            “Nature provides the botanical essence; scientific inquiry provides the structure.”
          </p>
          <p className="text-xs text-[#A8BDB0] font-sans">
            Student formulation project developed with academic diligence and transparent documentation.
          </p>
        </div>
      </div>
    </section>
  );
};
