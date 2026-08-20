import {NextRequest} from "next/server";
import {apiFailure,apiSuccess} from "@/lib/server/api/response";
import {getRequestId} from "@/lib/server/security/request-id";
import {requireCustomer} from "@/lib/server/account/session";
import {parseJsonObject} from "@/lib/server/api/validation";
import {normalizeLocale} from "@/lib/i18n/config";
import {ensureCustomerProfile} from "@/lib/server/account/service";
import {supabaseCustomerProfiles} from "@/lib/server/supabase/customer-profiles";
export async function PATCH(request:NextRequest){
 const requestId=getRequestId(request);
 try{
  const customer=await requireCustomer(request);
  const body=await parseJsonObject(request);
  const locale=normalizeLocale(typeof body.locale==="string"?body.locale:null);
  await ensureCustomerProfile(customer.id);
  await supabaseCustomerProfiles.patch(customer.id,{preferred_locale:locale,updated_at:new Date().toISOString()} as never);
  return apiSuccess({locale},requestId);
 }catch(e){return apiFailure(e,requestId)}
}
