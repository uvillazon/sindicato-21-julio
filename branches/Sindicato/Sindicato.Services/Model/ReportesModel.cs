﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sindicato.Model;

namespace Sindicato.WebSite.Models
{
    public class SocioMovilModel
    {
        public int NRO { get; set; }
        public string APELLIDO_PATERNO { get; set; }
        public string APELLIDO_MATERNO { get; set; }
        public string NOMBRES { get; set; }
        public string MOVIL { get; set; }
        public DateTime? FECHA_INGRESO { get; set; }
        public decimal ANTIGUEDAD { get; set; }
        public decimal? MONTO_DEVOLUCION { get; set; }
        public string FIRMA { get; set; }
        public string OBSERVACION { get; set; }
       

    }

    public class SocioMovilHojas
    {
        public int NRO_MOVIL { get; set; }
        public string SOCIO { get; set; }
        public string TIPO_LINEA { get; set; }
        public decimal SEGURO { get; set; }
        public decimal INSTITUCION { get; set; }
        public decimal CANASTON { get; set; }
        public decimal AHORRO { get; set; }
    }
}
