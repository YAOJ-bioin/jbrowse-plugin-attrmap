# Plugin Rename Summary: QuantSeq → AttrMap

**Date**: January 7, 2026  
**Version**: 0.1.0  
**Author**: Jie Yao <JieYao@uga.edu>

## Overview
Successfully renamed the JBrowse plugin from `jbrowse-plugin-quantseq` to `jbrowse-plugin-attrmap` (AttrMap v0.1.0).

## Changes Made

### 1. Plugin Source Code
- **Directory**: `/scratch/jy16611/git/jbrowse-plugin-attrmap/` (renamed from `jbrowse-plugin-quantseq`)
- **package.json**:
  - `name`: `"jbrowse-plugin-attrmap"`
  - `version`: `"0.1.0"`
  - `module`: Updated to `"dist/jbrowse-plugin-attrmap.esm.js"`
  - Build scripts: Updated `--name` parameter to `JBrowsePluginAttrMap`
  - `jbrowse-plugin.name`: `"AttrMap"`
  - `author`: Updated to Jie Yao
  
- **src/index.ts**:
  - Class name: `AttrMapPlugin` (was `QuantseqPlugin`)
  - Plugin name: `'AttrMap'` (was `'Quantseq'`)

- **README.md**: Completely rewritten to describe AttrMap functionality

### 2. Build Output
Built files now named with `jbrowse-plugin-attrmap` prefix:
- `jbrowse-plugin-attrmap.umd.production.min.js`
- `jbrowse-plugin-attrmap.esm.js`
- `jbrowse-plugin-attrmap.cjs.production.min.js`
- etc.

### 3. JBrowse2 Configuration

#### Main Config (`/scratch/jy16611/jbrowse2/config.json`)
```json
{
  "plugins": [
    {
      "name": "AttrMap",
      "url": "/jbrowse-plugin-attrmap/jbrowse-plugin-attrmap.umd.production.min.js?v=0.1.0"
    }
  ]
}
```

#### Soybean Config (`/scratch/jy16611/jbrowse2/config_soybean.json`)
- Generated via updated `update_jbrowse_config.py` script
- Contains 5 ISM attribution tracks
- Plugin reference updated to AttrMap

### 4. Symbolic Links
```bash
/scratch/jy16611/jbrowse2/jbrowse-plugin-attrmap 
  → /scratch/jy16611/git/jbrowse-plugin-attrmap/dist
```

### 5. Helper Scripts Updated
- **update_jbrowse_config.py**: Plugin references updated
- **START_SOYBEAN_ISM.sh**: Description updated to mention AttrMap v0.1.0

## Features of AttrMap Plugin

### Attribution Map Visualization
- Displays base-pair resolution attribution scores as **sequence logos**
- ATCG letters replace traditional bar charts
- Letter height represents attribution score magnitude
- Color coding: A=green, T=red, G=yellow, C=blue

### Rendering Behavior
- **Positive scores**: Letters extend upward from baseline
- **Negative scores**: Letters flip and extend downward
- **Fixed width**: Each base has consistent horizontal spacing
- **Auto-switch**: Uses standard view for regions > 5000bp

## Testing the Plugin

### Start JBrowse2 with Soybean ISM Data
```bash
cd /scratch/jy16611/jbrowse2
bash START_SOYBEAN_ISM.sh
```

### Or Manually
```bash
cd /scratch/jy16611/jbrowse2
module load nodejs/18.17.1-GCCcore-12.3.0
cp config_soybean.json config.json
npx serve -p 3000 .
```

### Viewing Attribution Maps
1. Open http://localhost:3000 in browser
2. Load a track (e.g., "ISM: Gm_atlas_Cotyledon_stage_seeds-Emb_epidermis")
3. Zoom to < 5000bp region
4. Sequence logos will appear with attribution scores

## Version Control / Git Repository

### Current Status
- Repository field in package.json ready for update
- No remote repository configured yet

### To Create New Repository
```bash
cd /scratch/jy16611/git/jbrowse-plugin-attrmap

# Initialize if not already done
git init

# Create repository on GitHub: jbrowse-plugin-attrmap

# Set remote
git remote add origin https://github.com/YOUR_USERNAME/jbrowse-plugin-attrmap.git

# Update package.json repository field
# Then commit and push
git add .
git commit -m "Rename plugin to AttrMap v0.1.0"
git push -u origin main
```

## Credits
Based on the original [jbrowse-plugin-quantseq](https://github.com/GMOD/jbrowse-plugin-quantseq) by Elliot Hershberg, adapted for attribution map visualization.

## License
MIT

