import {SupabaseRepository} from "./repository";
export type ContentTranslation={id:string;entity_type:string;entity_id:string;locale:"en"|"hi";field_name:string;translated_value:string;updated_at?:string};
export class ContentTranslationsRepo extends SupabaseRepository<ContentTranslation>{
 constructor(){super("content_translations")}
 listFor(entityType:string,entityId:string,locale:"en"|"hi"){
  return this.list({limit:100,query:`entity_type=eq.${encodeURIComponent(entityType)}&entity_id=eq.${encodeURIComponent(entityId)}&locale=eq.${locale}`});
 }
}
export const supabaseContentTranslations=new ContentTranslationsRepo();
