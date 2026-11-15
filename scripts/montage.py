from pathlib import Path
import subprocess
out=Path('portfolio-assets/video');(out/'segments').mkdir(exist_ok=True)
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def run(args):subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y',*args],check=True)
scenes=[('01-hero',9,'Premium E-commerce Experience'),('02-collection',5,'A considered collection'),('03-product',5,'Details that make the difference'),('04-mobile',5,'Made for every screen')]
for name,duration,label in scenes:
 src=out/'raw'/f'{name}.webm'
 mobile='mobile' in name
 scale='scale=900:1600:force_original_aspect_ratio=decrease' if mobile else 'scale=1080:1100:force_original_aspect_ratio=decrease'
 vf=f"fps=30,{scale},pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0xf7f4ee,setsar=1,tpad=stop_mode=clone:stop_duration=10,drawtext=fontfile={font}:text='L U N E O':fontcolor=0x622d38:fontsize=58:x=(w-tw)/2:y=110,drawtext=fontfile={font}:text='{label}':fontcolor=0x302d29:fontsize=30:x=(w-tw)/2:y=220,drawtext=fontfile={font}:text='BUILT BY NULLEXWEB':fontcolor=0x622d38:fontsize=24:x=(w-tw)/2:y=1780,fade=t=in:st=0:d=0.35"
 run(['-i',str(src),'-vf',vf,'-t',str(duration),'-an','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p',str(out/'segments'/f'{name}.mp4')])
run(['-f','lavfi','-i','color=c=0x622d38:s=1080x1920:r=30:d=3','-vf',f"drawtext=fontfile={font}:text='L U N E O':fontcolor=0xf7f4ee:fontsize=90:x=(w-tw)/2:y=680,drawtext=fontfile={font}:text='E-commerce Concept':fontcolor=0xf7f4ee:fontsize=34:x=(w-tw)/2:y=850,drawtext=fontfile={font}:text='NULLEXWEB':fontcolor=0xf7f4ee:fontsize=42:x=(w-tw)/2:y=1060,drawtext=fontfile={font}:text='nullexweb.com':fontcolor=0xf7f4ee:fontsize=28:x=(w-tw)/2:y=1140",'-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p',str(out/'segments'/'05-outro.mp4')])
inputs=[]
for name in [s[0] for s in scenes]+['05-outro']:inputs+=['-i',str(out/'segments'/f'{name}.mp4')]
filters='[0:v][1:v]xfade=transition=fade:duration=0.4:offset=8.6[v1];[v1][2:v]xfade=transition=fade:duration=0.4:offset=13.2[v2];[v2][3:v]xfade=transition=fade:duration=0.4:offset=17.8[v3];[v3][4:v]xfade=transition=fade:duration=0.4:offset=22.4[v]'
run([*inputs,'-filter_complex_threads','1','-filter_complex',filters,'-map','[v]','-an','-r','30','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',str(out/'luneo-instagram-reel.mp4')])
