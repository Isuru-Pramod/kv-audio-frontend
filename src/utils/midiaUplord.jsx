import { createClient } from "@supabase/supabase-js";


const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubXRyemVlZWh4a2Zpd2Z5dmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NDIwOTgsImV4cCI6MjA2NjAxODA5OH0.BGwjWKg212Oj18lPKGmAkyM2tvjhiIIwI-fwRkPgSnw";
const supabase_url = "https://knmtrzeeehxkfiwfyvbe.supabase.co";

const supabase = createClient(supabase_url,anon_key)

export default function mediaUplload(file){

    return new Promise((resolve, reject)=> {
        if (file == null){
            reject("No file selected")
        }

        const timestamp = new Date().getTime();
        const fileName = timestamp+file.name

        supabase.storage.from("images").upload(fileName,file,{
            cacheControl: '3600',
            upsert : false,
        }).then(()=>{
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl); 
        }).catch(()=>{
            reject("Error uploading file")
        })
    })


}