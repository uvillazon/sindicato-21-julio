select * from public.profiler order by id desc;
select count(1) from public.profiler;



delete from public.profiler where id > -1;

select * from public.profiler order by id desc;
select * from public.notif_estudiante order by idnotif_estud desc;
delete from notif_estudiante where idnotificacion =704328;

ALTER TABLE public.notif_estudiante ALTER COLUMN idnotif_estud SET DEFAULT nextval('q_notif_estudiantes')
;
560257
alter sequence q_notif_estudiantes restart with 560257;

select nextval('q_notif_estudiantes');

INSERT INTO public.notif_estudiante ( idestudiante, idnotificacion, fecha_creacion, fecha_envio, idestado_notif, fecha_lectura)
VALUES (2286, 599911, now(), now(), 1, null);

704325
select * from notificacion order by idnotificacion desc;
select count(1) from public.notif_estudiante where idnotificacion =560527;

delete from notif_estudiante where idnotificacion in (560258, 560259 , 560527);
select * from profiler;
select count(1) from profiler;
delete from profiler where id >-1;

704324

