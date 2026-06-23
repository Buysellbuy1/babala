'use client'
import { useState } from 'react'

const districts = [
  {
    id: 'port-louis',
    name: 'Port Louis',
    color: '#ff6b35',
    places: ['Port Louis', 'Pailles', 'Roche Bois', 'Plaine Verte', 'St Michel', 'Cassis', 'Bain des Dames', 'Cite Martial', 'Tranquebar', 'Vallée Pitot'],
    path: 'M 142 95 L 158 88 L 168 95 L 172 110 L 165 122 L 150 125 L 138 118 L 135 105 Z',
    labelX: 152,
    labelY: 108,
  },
  {
    id: 'pamplemousses',
    name: 'Pamplemousses',
    color: '#00d4ff',
    places: ['Pamplemousses', 'Triolet', 'Trou aux Biches', 'Pointe aux Piments', 'Baie du Tombeau', 'Arsenal', 'Terre Rouge', 'Le Hochet', 'Calebasses', 'Fond du Sac', 'Montagne Longue', 'Notre Dame', 'Plaine des Papayes', 'Crève Coeur', 'D\'Épinay', 'Belle Vue Haurel', 'Congomah', 'Morcellement Saint André', 'Piton', 'Ville Bague', 'Mapou', 'Grand Baie'],
    path: 'M 158 88 L 175 78 L 195 72 L 210 80 L 215 95 L 205 108 L 190 112 L 172 110 L 168 95 Z',
    labelX: 190,
    labelY: 92,
  },
  {
    id: 'riviere-rempart',
    name: 'Riv. du Rempart',
    color: '#00ff88',
    places: ['Rivière du Rempart', 'Grand Baie', 'Pereybere', 'Cap Malheureux', 'Goodlands', 'Grand Gaube', 'Roche Terre', 'Roches Noires', 'Poudre d\'Or', 'Poudre d\'Or Hamlet', 'Petit Raffray', 'Cottage', 'Amitié-Gokhoola', 'Anse La Raie', 'Amaury', 'Espérance Trébuchet', 'Le Vale', 'Vale', 'Brisée Verdière', 'Plaine des Roches', 'Mapou', 'Piton', 'Ville Bague'],
    path: 'M 210 80 L 230 72 L 252 78 L 260 92 L 255 108 L 240 115 L 225 112 L 215 95 Z',
    labelX: 235,
    labelY: 93,
  },
  {
    id: 'flacq',
    name: 'Flacq',
    color: '#ffd700',
    places: ['Centre de Flacq', 'Quatre Cocos', 'Trou d\'Eau Douce', 'Belle Mare', 'Palmar', 'Lalmatie', 'Bel Air Rivière Sèche', 'Bon Accueil', 'Camp de Masque', 'Camp de Masque Pavé', 'Camp Ithier', 'Clémencia', 'Écroignard', 'Grande Rivière Sud Est', 'Laventure', 'Mare La Chaux', 'Olivia', 'Poste de Flacq', 'Quatre Soeurs', 'Queen Victoria', 'Saint Julien Village', 'Sébastopol', 'Amaury', 'Brisée Verdière', 'Bramsthan', 'Grande Retraite', 'Plaine des Roches'],
    path: 'M 252 78 L 272 82 L 285 98 L 282 118 L 268 130 L 252 128 L 240 115 L 255 108 Z',
    labelX: 263,
    labelY: 108,
  },
  {
    id: 'grand-port',
    name: 'Grand Port',
    color: '#ff0080',
    places: ['Mahébourg', 'Rose Belle', 'New Grove', 'Plaine Magnien', 'Beau Vallon', 'Grand Sable', 'Mare d\'Albert', 'Nouvelle France', 'Rivière des Créoles', 'Vieux Grand Port', 'Trois Boutiques', 'Union Park', 'Bambous Virieux', 'Bananes', 'Bois des Amourettes', 'Camp Carol', 'Cluny', 'Grand Bel Air', 'L\'Escalier', 'La Flora', 'Mare Chicose', 'Mare Tabac', 'Petit Bel Air', 'Rivière du Poste', 'Saint Hubert', 'Saint Julien d\'Hotman'],
    path: 'M 268 130 L 282 118 L 290 135 L 285 158 L 268 165 L 252 158 L 248 142 L 252 128 Z',
    labelX: 268,
    labelY: 147,
  },
  {
    id: 'savanne',
    name: 'Savanne',
    color: '#b400ff',
    places: ['Souillac', 'Chemin Grenier', 'Rivières des Anguilles', 'Surinam', 'Grand Bois', 'Baie du Cap', 'Bel Ombre', 'Bénarès', 'Bois Chéri', 'Britannia', 'Camp Diable', 'Chamouny', 'La Flora', 'L\'Escalier', 'Rivière du Poste', 'Saint Aubin', 'Tyack', 'Chamarel'],
    path: 'M 248 142 L 252 158 L 268 165 L 265 182 L 248 188 L 228 182 L 220 165 L 228 148 Z',
    labelX: 246,
    labelY: 168,
  },
  {
    id: 'black-river',
    name: 'Black River',
    color: '#ff6b35',
    places: ['Flic en Flac', 'Tamarin', 'Black River', 'La Gaulette', 'Case Noyale', 'Albion', 'Bambous', 'Petite Rivière', 'Grande Rivière Noire', 'Gros Cailloux', 'Le Morne', 'Richelieu', 'Cascavelle', 'Chamarel', 'Rivière Noire'],
    path: 'M 135 105 L 150 125 L 148 142 L 140 158 L 128 165 L 115 158 L 112 142 L 118 125 Z',
    labelX: 130,
    labelY: 140,
  },
  {
    id: 'moka',
    name: 'Moka',
    color: '#00d4ff',
    places: ['Moka', 'Quartier Militaire', 'Saint Pierre', 'Verdun', 'Corps de Garde', 'Dagotière', 'Camp Thorel', 'Espérance', 'L\'Avenir', 'La Laura-Malenga', 'Melrose', 'Montagne Blanche', 'Nouvelle Découverte', 'Providence', 'Ripailles', 'Saint Julien d\'Hotman'],
    path: 'M 165 122 L 172 110 L 190 112 L 205 108 L 215 120 L 210 138 L 195 145 L 178 142 L 168 132 Z',
    labelX: 190,
    labelY: 128,
  },
  {
    id: 'plaines-wilhems',
    name: 'Plaines Wilhems',
    color: '#ff0080',
    places: ['Quatre Bornes', 'Vacoas', 'Phoenix', 'Curepipe', 'Rose Hill', 'Beau Bassin', 'Floreal', 'Stanley', 'Sodnac', 'Midlands', 'Ebène', 'Cascavelle', 'Camp Levieux', 'Candos', 'Highlands', 'Palma', 'Rivière du Poste'],
    path: 'M 150 125 L 165 122 L 168 132 L 178 142 L 175 158 L 160 165 L 148 158 L 148 142 Z',
    labelX: 162,
    labelY: 145,
  },
]

interface Props {
  onSelect: (district: string, places: string[]) => void
  selected: string
}

export default function MauritiusMap({ onSelect, selected }: Props) {
  const [hovered, setHovered] = useState('')

  return (
    <div style={{ width: '100%', maxWidth: '420px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <div style={{ fontSize: '13px', color: selected ? '#ff6b35' : 'rgba(255,255,255,0.5)', fontWeight: selected ? 700 : 400 }}>
          {selected ? `📍 ${selected} selected` : 'Tap your district on the map below'}
        </div>
      </div>

      <svg viewBox="80 60 230 150" style={{ width: '100%', filter: 'drop-shadow(0 10px 40px rgba(255,107,53,0.2))' }} xmlns="http://www.w3.org/2000/svg">

        {/* Ocean */}
        <rect x="80" y="60" width="230" height="150" fill="rgba(0,20,50,0.9)" rx="12" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="80" y1={68 + i * 18} x2="310" y2={68 + i * 18} stroke="rgba(0,150,255,0.06)" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`v${i}`} x1={88 + i * 18} y1="60" x2={88 + i * 18} y2="210" stroke="rgba(0,150,255,0.06)" strokeWidth="0.5" />
        ))}

        {/* Districts */}
        {districts.map(d => {
          const isSelected = selected === d.name
          const isHovered = hovered === d.id
          return (
            <g key={d.id} style={{ cursor: 'pointer' }}
              onClick={() => onSelect(d.name, d.places)}
              onMouseEnter={() => setHovered(d.id)}
              onMouseLeave={() => setHovered('')}>
              <path d={d.path}
                fill={isSelected ? d.color : isHovered ? `${d.color}88` : `${d.color}33`}
                stroke={isSelected || isHovered ? d.color : `${d.color}66`}
                strokeWidth={isSelected ? '2' : '1'}
                style={{ transition: 'all 0.2s ease', filter: isSelected ? `drop-shadow(0 0 10px ${d.color})` : isHovered ? `drop-shadow(0 0 5px ${d.color})` : 'none' }} />
              <text x={d.labelX} y={d.labelY} textAnchor="middle"
                fontSize={isSelected ? '5.5' : '4.5'}
                fontWeight={isSelected ? '800' : '600'}
                fill={isSelected ? '#fff' : 'rgba(255,255,255,0.85)'}
                style={{ pointerEvents: 'none' }}>
                {d.name.length > 12 ? d.name.substring(0, 11) + '..' : d.name}
              </text>
            </g>
          )
        })}

        {/* Rodrigues */}
        <g style={{ cursor: 'pointer' }} onClick={() => onSelect('Rodrigues', ['Port Mathurin', 'La Ferme', 'Pointe Canon', 'Anse aux Anglais', 'Baie aux Huîtres', 'Mont Lubin', 'Rivière Banane'])}>
          <ellipse cx="295" cy="170" rx="10" ry="6"
            fill={selected === 'Rodrigues' ? '#ffd700' : 'rgba(255,215,0,0.25)'}
            stroke={selected === 'Rodrigues' ? '#ffd700' : 'rgba(255,215,0,0.4)'}
            strokeWidth="1"
            style={{ filter: selected === 'Rodrigues' ? 'drop-shadow(0 0 8px #ffd700)' : 'none', transition: 'all 0.2s', cursor: 'pointer' }} />
          <text x="295" y="172" textAnchor="middle" fontSize="3.5" fill="rgba(255,255,255,0.8)" fontWeight="600" style={{ pointerEvents: 'none' }}>Rodrigues</text>
        </g>

        {/* Compass */}
        <text x="92" y="72" fontSize="6" fill="rgba(255,255,255,0.25)" fontWeight="700">N</text>
        <line x1="92" y1="74" x2="92" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <text x="155" y="202" textAnchor="middle" fontSize="4.5" fill="rgba(0,150,255,0.25)" fontStyle="italic">Indian Ocean</text>
      </svg>

      {/* Places list */}
      {selected && (
        <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', padding: '14px' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            All places in {selected} ({districts.find(d => d.name === selected)?.places.length || 0} areas)
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxHeight: '120px', overflowY: 'auto' }}>
            {districts.find(d => d.name === selected)?.places.map(place => (
              <span key={place} style={{ background: 'rgba(255,107,53,0.12)', border: '1px solid rgba(255,107,53,0.25)', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>
                {place}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
