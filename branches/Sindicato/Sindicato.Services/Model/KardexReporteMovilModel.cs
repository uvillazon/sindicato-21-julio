﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Sindicato.Services.Model
{
    public class KardexReporteMovilModel
    {
    }

    public class KardexNroMovilReporte {
        public DateTime? FECHA_REG { get; set; }
        public int NRO_MOVIL_ANTERIOR { get; set; }
        public int NRO_MOVIL_NUEVO { get; set; }
        public string OBSERVACION { get; set; }
        public string LOGIN { get; set; }
    }
    public class KardexMovilReporte {
        public string SOCIO { get; set; }
        public DateTime? FECHA_REG { get; set; }
        public DateTime? FECHA_ALTA { get; set; }
        public DateTime? FECHA_BAJA { get; set; }
        public string OBSERVACION { get; set; }
        public string ESTADO { get; set; }
    }
    public class SocioReporteKardexMovil {
        public int? ID_SOCIO { get; set; }
        public int? ID_SOCIO_MOVIL { get; set; }
        public int? ID_MOVIL { get; set; }
        public int? ID_CHOFER { get; set; }
        public int? NRO_SOCIO { get; set; }
        public int? NRO_MOVIL { get; set; }
        public string NOMBRE { get; set; }
        public string APELLIDO_PATERNO { get; set; }
        public string APELLIDO_MATERNO { get; set; }
        public string ESTADO_CIVIL { get; set; }
        public string CELULAR { get; set; }

        public string TELEFONO { get; set; }
        public DateTime? FECHA_ALTA { get; set; }
        public DateTime? FECHA_ALTA_MOVIL { get; set; }
        public int? NRO_LICENCIA { get; set; }
        public int? CI { get; set; }
        public DateTime? FECHA_NAC { get; set; }
        public string DOMICILIO { get; set; }
        public string OBSERVACION { get; set; }
        public string ESTADO { get; set; }
        public int? ID_OBLIGACION { get; set; }
        public int? ID_CIERRE { get; set; }
        public int? ID_REGULACION { get; set; }
        public string PLACA { get; set; }
        public string TIPO { get; set; }
        public string COLOR { get; set; }
        public string MARCA { get; set; }
        public string MODELO { get; set; }
        public string MOTOR { get; set; }
        public string CHASIS { get; set; }
        public DateTime? FECHA_ALTA_AUTO { get; set; }
        public string OBSERV_AUTO { get; set; }
    }
}
